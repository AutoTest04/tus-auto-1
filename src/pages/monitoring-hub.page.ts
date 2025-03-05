import { Locator, Request } from '@playwright/test';
import { Artifact, ArtifactService, BasePage, Logger, interceptJson, retry } from '@trident/e2e-common';

import { RecentRunsComponent } from '../components/monitoring_hub/recent-runs.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { TriListFilterComponent } from '../components/tri_list_filter/tri-list-filter.component';
import { TriPillBarComponent } from '../components/tri_pill_bar/tri-pill-bar.component';
import { ArtifactJobListFilterGroupId, ColumnName } from '../models/artifact-job';

const logger: Logger = new Logger('trident.page.monitoringHub');

export class MonitoringHubPage extends BasePage {
    readonly triListFilter = new TriListFilterComponent(this.page);
    readonly triPillBar = new TriPillBarComponent(this.page, '.monitor-pill-bar');
    readonly recentRuns = new RecentRunsComponent(this.page);
    readonly notification = new NotificationComponent(this.page);
    readonly artifactService = this.createService(ArtifactService);

    // monitoring hub container
    monitoringHubContainer = this.locator('monitoring-hub-container');

    // table selectors
    monitoringLoadingSpinner = this.page.getByTestId('monitoring-table-loading');
    monitoringTable = this.page.getByTestId('monitoring-table');
    monitoringEmptyState = this.page.getByTestId('monitoring-empty-state');
    baseTable = this.page.getByTestId('base-table');
    jobItems = this.locator('base-table').locator('.mat-mdc-row');
    contextMenu = this.locator('.cell-context-menu');

    detailPanel = this.page.getByTestId('monitoring-detail-panel');
    tooltips = this.page.getByTestId('tri-tooltip-content');
    tableBottom = this.page.getByTestId('table-bottom-container');

    // selectors of workspace list
    fluentListBody = this.getByTestId(`artifact-content-view`);
    nameCell = this.fluentListBody.getByTestId('fluentListCell.name');
    quickActionButton = this.getByTestId('options-menu');
    recentRunButton = this.getByTestId('contextMenuItem.Recent runs');

    // filter selectors
    refreshButton = this.getByTestId('refresh-button');
    exportButton = this.getByTestId('export-button');
    columnOptionsButton = this.getByTestId('column-options-button');
    columnOptionsMenu = this.getByTestId('columnOptions');

    monitoringHubQueryAPIURLRegex = /.*\/metadata\/monitoringhub\/histories.*/;

    // hierarchy view selectors
    viewTopicButton = this.getByTestId('view-topic-button');
    viewTopicButtonText = this.getByTestId('view-topic-button-text');
    viewTopicHeader = this.getByTestId('view-topic-header');

    // export dialog selectors
    exportDialog = this.getByTestId('export-dialog');
    taskFlowDialog = this.getByTestId('trident-dialog');
    taskFlowGotItBtn = this.taskFlowDialog.getByTestId('tri-button').getByText('Got it');

    async gotoMonitoringHubPage(
        experience = 'power-bi',
    ): Promise<void> {
        await this.goto('/monitoringhub', {
            featureSwitches:
            {
                experience: experience,
                language: 'en-us',
            },
        });

        await this.monitoringHubContainer.waitFor();
        await this.triListFilter.setup();
    }


    async setupPendingExpectForMock(status: number, body?: string, pendingExpectCall?: (request: Request) => Promise<void>|void): Promise<void> {
        await this.page.route(
            this.monitoringHubQueryAPIURLRegex,
            async (route, request) => {
                if (pendingExpectCall) {
                    await pendingExpectCall(request);
                }

                await route.fulfill({
                    status,
                    body
                });
            }
        );
    }


    async setupCapacityMock(): Promise<void> {
        await this.page.route(
            /.*\/capacities\/author.*/,
            async (route) => interceptJson(route, ()=>{
                return [{
                    "capacityObjectId": "F0F34675-0721-4D59-9D76-A0A653A35C12",
                    "displayName": "Trial-20231023T080130Z-test",
                    "region": "East US 2 EUAP",
                    "sku": "FT1",
                    "skuTier": "DataCapacityTrial",
                    "capacitySkuTier": 7
                }];
            })
        );
    }

    getQueryAPIRequestParameters(request: Request): Partial<Record<ArtifactJobListFilterGroupId | string, string[]>> {
        const urlParams = new URLSearchParams(request.url().split('?')[1]);
        const filterParams = <Partial<Record<ArtifactJobListFilterGroupId | string, string[]>>>{};
        if (urlParams?.has('artifactTypes')) {
            filterParams.type = urlParams?.get('artifactTypes')?.split(',');
        }
        if (urlParams?.has('startTime')) {
            filterParams.startTime = urlParams?.get('startTime')?.split(',');
        }
        if (urlParams?.has('endTime')) {
            filterParams.endTime = urlParams?.get('endTime')?.split(',');
        }
        if (urlParams?.has('status')) {
            filterParams.status = urlParams?.get('status')?.split(',');
        }
        if (urlParams?.has('ownerId')) {
            filterParams.submitter = urlParams?.get('ownerId')?.split(',');
        }
        if (urlParams?.has('folderIds')) {
            filterParams.workspace = urlParams?.get('folderIds')?.split(',');
        }
        if (urlParams?.has('search')) {
            filterParams.search = urlParams?.get('search')?.split(',');
        }
        return filterParams;
    }


    async reloadPage(): Promise<void> {
        await this.page.reload();
        await this.monitoringHubContainer.waitFor();
    }

    async goBackToMonitoringHubPage(): Promise<void> {
        await this.getByTestId('navbarItem home').click();
        // home page url reg check.
        await this.waitForUrlReceived(/.*\/home\?.*/);
        await this.getByTestId('navbarItem monitoringHub').click();
        await this.monitoringHubContainer.waitFor();
    }

    async waitForHistoryItemsDisplay(
        count: number
    ): Promise<boolean> {
        let result = false;
        await retry(
            async () => {
                if(await this.jobItems.count() === count){
                    result = true;
                    return;
                }
                return Promise.reject(`job items count is not equal to ${count}`);
            },
            { times: 10, retryIntervals: 1000 }
        );
        return result;
    }

    async clickRefreshButton(): Promise<void> {
        const refreshBtn = this.locator('.refresh-button');
        await refreshBtn.click();
    }

    async refreshTableData(): Promise<void> {
        await this.clickRefreshButton();

        await this.waitForRefresh();
    }

    async sortByColumn(sortColumnId: string): Promise<void> {
        await this.monitoringTable.getByTestId(sortColumnId).getByRole('button').click();
    }

    async getSortArrowButton(sortColumnId: string): Promise<Locator> {
        return await this.monitoringTable.getByTestId(sortColumnId).getByRole('button');
    }

    getColumnHeader(columnName: string): Locator {
        return this.monitoringTable.getByTestId(columnName);
    }

    async cellSelect(row: number, cellTestId: string): Promise<Locator> {
        return await this.jobItems.nth(row).getByTestId(cellTestId);
    }

    async openRecentRuns(): Promise<void> {
        const nameCell = await this.cellSelect(0, 'name-cell');
        await nameCell.hover();

        const contextMenuButton = await nameCell.getByTestId('cell-context-menu');
        await contextMenuButton.click();
        const actionButton = this.contextMenu.getByTestId('recent');
        await actionButton.click();
        await this.recentRuns.setup();
    }


    async openDetailPanel(row: number): Promise<void> {
        const nameCell = await this.cellSelect(row,'name-cell');
        await nameCell.hover();
        await nameCell.getByTestId('detail').click();
    }

    async clickNameLink(row: number): Promise<void> {
        const nameCell = await this.cellSelect(row,'name-cell');
        await nameCell.getByRole('link').click();
    }

    async waitForUrlReceived(url: string | RegExp): Promise<void> {
        await this.page.waitForURL(url, { waitUntil:'commit' });
    }

    getCurrentUrl(): string {
        return this.page.url();
    }

    async waitForRefresh(): Promise<void> {
        await this.monitoringTable.isHidden();
        await this.monitoringTable.isVisible();
        await this.page.waitForTimeout(1000);
    }

    async tableScrollToBottom(): Promise<void> {
        await this.baseTable.evaluate((tableElement) => {
            if (tableElement) {
                const isScrollable =  tableElement.clientHeight < tableElement.scrollHeight;
                if (isScrollable) {
                    tableElement.scrollTo(0, tableElement.scrollHeight);
                }
            }
        });
    }

    async getLocatorContent(locatorItem: Locator): Promise<string> {
        return await locatorItem.evaluate((locatorElement) => {
            if (locatorElement) {
                const textValue = locatorElement.textContent;
                return String(textValue).trim().split(' ')[0];
            } else {
                throw new Error(`Locator element not found`);
            }
        });
    }

    async getTableScrollPosition(): Promise<number> {
        return await this.baseTable.evaluate((tableElement) => {
            if (tableElement) {
                return tableElement.scrollTop;
            } else {
                return 0;
            }
        });
    }

    async gotoWorkspacePage(workspaceId: string): Promise<void> {
        await this.goto(
            `/groups/${workspaceId}`,
            {
                featureSwitches: {
                    language: 'en-us',
                }
            },
        );

        await this.fluentListBody.waitFor();
        // this layout will block name cell hover
        if (await this.taskFlowDialog.isVisible()) {
            await this.taskFlowGotItBtn.click({force: true});
            await this.taskFlowDialog.waitFor({state: 'hidden'});
        }
    }

    /**
     * Open recent run panel in the artifact list page.
     */
    async openArtifactRecentRunPanel(): Promise<void> {
        await this.nameCell.hover();

        await this.quickActionButton.focus();

        await this.quickActionButton.click();

        await this.recentRunButton.click({ timeout: 60 * 1000 });

        await this.recentRuns.setup();
    }

    async openColumnOptionsFilter(): Promise<void> {
        if (await this.columnOptionsMenu.isVisible()) {
            return;
        }
        await this.columnOptionsButton.click();
    }

    async selectColumnsAndApply(ids: string | string[]): Promise<void> {
        if (typeof ids === 'string') {
            await this.columnOptionsMenu.getByTestId('columnOptions.' + ids).click();
        } else {
            for (const id of ids) {
                await this.columnOptionsMenu.getByTestId('columnOptions.' + id).click();
            }
        }
        // apply
        await this.columnOptionsMenu.getByTestId('apply-button').click();
    }

    async resetColumnOptionsToDefaultAndApply(): Promise<void> {
        await this.openColumnOptionsFilter();
        await this.columnOptionsMenu.getByTestId('reset-button').click();
        // apply
        await this.columnOptionsMenu.getByTestId('apply-button').click();
    }

    async getSelectedColumnsInOrder(): Promise<string[]> {
        await this.openColumnOptionsFilter();
        const selectList = this.columnOptionsMenu.locator(`[data-testid^="columnOptions."]`);
        const selectedColumns: string[] = [];

        for (const item of await selectList.all()) {
            const itemChecked = await item.locator(`[name="checkbox_checked_20_filled"]`).isVisible();
            if (itemChecked) {
                const testId = await item.getAttribute('data-testid');
                selectedColumns.push(testId!.slice('columnOptions.'.length));
            }
        }

        return selectedColumns;
    }

    async getTableColumnsInOrder(): Promise<string[]> {
        const columnList = await this.baseTable.locator('th');
        const displayedColumns: string[] = [];

        for (const item of await columnList.all()) {
            const columnName = await item.getAttribute('data-testid') || '';
            displayedColumns.push(columnName);
        }
        return displayedColumns;
    }

    async waitForTime(times: number): Promise<void> {
        await this.page.waitForTimeout(times);
    }


    /**
     * Navigate to monitoring hub page by clicking
     * navigation button in recent run panel.
     */
    async navigateToMonitoringHubPageWithArtifactContext(): Promise<void> {
        await this.openArtifactRecentRunPanel();

        await this.recentRuns.navigationButton.click();

        await this.monitoringHubContainer.waitFor();
    }

    async showHistoricalRuns(): Promise<void> {
        const nameCell = await this.cellSelect(0, 'name-cell');
        await nameCell.hover();

        const contextMenuButton = await nameCell.getByTestId('cell-context-menu');
        await contextMenuButton.click();
        const actionButton = this.contextMenu.getByTestId('historical_runs');
        await actionButton.click();
    }

    async showDownstreamRun(): Promise<void> {
        await this.openColumnOptionsFilter();
        await this.selectColumnsAndApply([ColumnName.DownstreamRun]);

        const downstreamCell = await this.cellSelect(0, 'downstream-cell-button');
        await downstreamCell.click();
    }

    async showUpstreamRun(): Promise<void> {
        await this.openColumnOptionsFilter();
        await this.selectColumnsAndApply([ColumnName.UpstreamRun]);

        const upstreamCell = await this.cellSelect(0, 'upstream-cell-button');
        await upstreamCell.click();
    }

    async backToMainView(): Promise<void> {
        await this.viewTopicButton.click();
    }
}
