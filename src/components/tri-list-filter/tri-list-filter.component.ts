import { Locator } from '@playwright/test';

import { LocatorHost, retry, Logger } from '@trident/e2e-common';

import { ArtifactListFilterGroupId } from '../../models/artifact';
import { ArtifactJobListFilterGroupId } from '../../models/artifact-job';
import { ComponentCommon } from '../component.common';

const logger: Logger = new Logger('trident.component.tri-list-filter');

export class TriListFilterComponent extends ComponentCommon {
    filterMenu: Locator;
    filterMenuClearButton: Locator;
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-list-filter'));

        // menu is portaled to top root
        this.filterMenu = parent.getByTestId('filterMenu');
        this.filterMenuClearButton = parent.getByTestId('clearFilterButton');
    }

    async setup(): Promise<void> {
        await this.root.waitFor();
    }

    filterSearchBox = this.locator('tri-search-box');
    filterMenuButton = this.locator('tri-filter-menu button');
    filterTriggerButton = this.getByTestId('filterTriggerButton');

    filterMenuGroup = (groupId: string) =>
        this.filterMenu.getByTestId(`filterMenuGroup.${groupId}`);
    filterMenuGroupList = (groupId: string) =>
        this.filterMenu.getByTestId(`filterMenuGroupList.${groupId}`);
    filterMenuItem = (groupList: Locator, filterId: string | number) =>
        groupList.getByTestId(`filterMenuItem.${filterId}`);
    filterCount = this.getByTestId('filter-count');

    async searchText(text: string): Promise<void> {
        await this.filterSearchBox.click();
        await this.filterSearchBox.locator('input').fill(text);
    }

    async clearText(): Promise<void> {
        await this.filterSearchBox.click();
        await this.filterSearchBox.locator('input').fill('');
    }


    async isFilterOpen(): Promise<boolean> {
        return await this.filterMenu.isVisible();
    }

    async toggleFilter(open?: boolean): Promise<boolean> {
        const target = open ?? !(await this.isFilterOpen());
        await retry(
            async () => {
                if ((await this.isFilterOpen()) === target) {
                    return;
                }
                await this.filterMenuButton.click();
                return Promise.reject('proceed to toggle filter');
            },
            { times: 4, retryIntervals: 0.5 * 1000 }
        );
        return target;
    }

    async getFilterGroupEntry(groupId: string): Promise<Locator> {
        await this.toggleFilter(true);
        const groupEntry = this.filterMenuGroup(groupId);
        logger.assert(
            await groupEntry.isVisible(),
            'Cannot find filter group with id:',
            groupId
        );
        await retry(
            async () => {
                const expanded = await groupEntry.getAttribute('aria-expanded');
                if (expanded === 'false') {
                    await groupEntry.click();
                    return Promise.reject('proceed to expand filter group');
                }
                return;
            },
            { times: 4, retryIntervals: 0.5 * 1000 }
        );
        return groupEntry;
    }

    async expandFilterGroup(groupId: string): Promise<Locator> {
        await this.getFilterGroupEntry(groupId);
        return this.filterMenuGroupList(groupId);
    }

    async clearFilter(): Promise<void> {
        await this.toggleFilter(true);
        await this.filterMenuClearButton.click();
        await this.toggleFilter(false);
    }

    // simply click, won't check if already checked.
    // use it after clearFilter for safe
    async selectFilter(
        groupId: ArtifactListFilterGroupId | ArtifactJobListFilterGroupId,
        ...filterIds: Array<string | number>
    ): Promise<void> {
        const groupList = await this.expandFilterGroup(groupId);
        for (const filterId of filterIds) {
            const filterItem = this.filterMenuItem(groupList, filterId);
            await filterItem.scrollIntoViewIfNeeded();
            await filterItem.click();
        }
        await this.toggleFilter(false);
    }

    async getFilterMenuItems(
        groupId: ArtifactListFilterGroupId | ArtifactJobListFilterGroupId,
    ): Promise<string[]> {
        const groupList = await this.expandFilterGroup(groupId);
        const filters = groupList.locator(`[data-testid^="filterMenuItem"]`);
        const ids: string[] = [];
        for (const filter of await filters.all()) {
            const testid = await filter.getAttribute('data-testid');
            ids.push(testid!.slice('filterMenuItem.'.length));
        }
        await this.toggleFilter(false);
        return ids;
    }

    async getFilterItem(
        groupId: ArtifactListFilterGroupId | ArtifactJobListFilterGroupId,
        filterId: string | number,
    ): Promise<Locator> {
        const groupList = await this.expandFilterGroup(groupId);
        const filterItem = this.filterMenuItem(groupList, filterId);
        return filterItem;
    }

    async getSelectedFilterMenuItems(
        groupId: ArtifactListFilterGroupId | ArtifactJobListFilterGroupId,
    ): Promise<string[]> {
        const groupList = await this.expandFilterGroup(groupId);
        const filters = groupList.locator(`[data-testid^="filterMenuItem"]`);
        const ids: string[] = [];
        for (const filter of await filters.all()) {
            const selected = await filter.getAttribute('data-selected');
            if (selected === 'true') {
                const testid = await filter.getAttribute('data-testid');
                ids.push(testid!.slice('filterMenuItem.'.length));
            }
        }
        await this.toggleFilter(false);
        return ids;
    }

    async isFilterMenuItemsSelected(
        groupId: ArtifactListFilterGroupId | ArtifactJobListFilterGroupId,
        ...filterIds: Array<string | number>
    ): Promise<boolean> {
        const groupList = await this.expandFilterGroup(groupId);
        for (const filterId of filterIds) {
            const filterItem = groupList.getByTestId(`filterMenuItem.${filterId}`);
            if ((await filterItem.getAttribute('data-selected')) !== 'true') {
                await this.toggleFilter(false);
                return false;
            }
        }
        await this.toggleFilter(false);
        return true;
    }

    async getFilterMenuGroupSearchBox(
        groupId: ArtifactListFilterGroupId | ArtifactJobListFilterGroupId,
    ): Promise<Locator> {
        await this.toggleFilter(true);
        const groupEntry = await this.getFilterGroupEntry(groupId);
        return groupEntry.getByTestId('filterMenuGroupSearch').locator('input');
    }

    async searchAndSelectGroupFilterItems(
        groupId: ArtifactListFilterGroupId | ArtifactJobListFilterGroupId,
        text: string,
        filterId: string | number
    ): Promise<void> {
        const searchBox = await this.getFilterMenuGroupSearchBox(groupId);
        await searchBox.fill(text);

        const groupList = this.filterMenuGroupList(groupId);
        await retry(
            async () => {
                if (await groupList.count() === 1) {
                    return;
                }
                return Promise.reject(`Group list filter items count is not equal to 1`);
            },
            { times: 5, retryIntervals: 1000 }
        );

        const filterItem = this.filterMenuItem(groupList, filterId);
        await filterItem.click();

        await this.toggleFilter(false);
    }

    async getFilterGroupCount(): Promise<number> {
        await this.toggleFilter(true);

        const filterGroups = this.filterMenu.getByTestId(
            /^filterMenuGroupList.*/
        );

        const filterGroupCount = await filterGroups.count();

        await this.toggleFilter(false);

        return filterGroupCount;
    }
}
