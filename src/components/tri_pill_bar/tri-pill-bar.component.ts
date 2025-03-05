
import { Locator } from '@playwright/test';

import { LocatorHost, BaseComponent, Logger } from '@trident/e2e-common';

import { ArtifactJobListFilterGroupId } from '../../models/artifact-job';

const logger: Logger = new Logger('trident.component.tri-pill-bar');

export class TriPillBarComponent extends BaseComponent {
    pillBar: Locator;
    pillBarClearButton: Locator;
    pillBarEmptyState: Locator;
    pillList: Locator;

    constructor(parent: LocatorHost, locator: string) {
        super(parent.locator(locator));

        // pill bar selectors
        this.pillBar = this.locator('tri-pill-bar');
        this.pillBarClearButton = this.getByTestId('pillButton.clear_all');
        this.pillBarEmptyState = this.page.getByTestId('emptyState');
        this.pillList = this.locator('tri-pill');
    }

    async clickClearButton(): Promise<void> {
        await this.pillBarClearButton.click();
    }

    async clickDismissButton(pillItemId: string): Promise<void> {
        const dismissBtn = this.pillList.getByTestId(`pillItem-${pillItemId}`).locator('.dismiss-icon');
        await dismissBtn.click();
    }

    async getAllPillBarItems(): Promise<string[]> {
        const pillList = this.pillList.locator(`[data-testid^="pillItem"]`);
        const pillItems: string[] = [];

        for (const item of await pillList.all()) {
            const testId = await item.getAttribute('data-testid');
            pillItems.push(testId!.slice('pillItem-'.length));
        }
        return pillItems;
    }

    async getGroupPillBarItems(
        groupId: ArtifactJobListFilterGroupId
    ): Promise<string[]> {
        const pillList = this.pillList.locator(`[data-testid^="pillItem"]`);
        const pillItems: string[] = [];

        for (const item of await pillList.all()) {
            const selectedGroupId = await item.getAttribute('data-groupid');
            if (groupId === selectedGroupId) {
                const testId = await item.getAttribute('data-testid');
                pillItems.push(testId!.slice('pillItem-'.length));
            }
        }
        return pillItems;
    }

    async closePillBarById(selectionId: string): Promise<void> {
        const pillItemCloseButton = await this.pillList.locator(`[data-testid="pill-close"][data-selectionid="${selectionId}"]`);
        await pillItemCloseButton.click();
    }
}