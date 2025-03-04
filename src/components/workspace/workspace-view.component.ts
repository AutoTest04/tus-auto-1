import { LocatorHost, BaseComponent } from '@trident/e2e-common';

import { ArtifactRowComponent } from './artifact-row.component';
import { BreadcrumbComponent } from '../subfolder/breadcrumbs.component';

export class WorkspaceViewComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator(`workspace-view`));
    }

    readonly breadcrumbs = new BreadcrumbComponent(this.root);
    readonly workspaceHeader = this.locator('trident-workspace-header');
    readonly workspaceHeaderText = this.locator('trident-workspace-header .workspace-name-text');
    readonly actionBar = this.locator('tri-workspace-action-base .action-bar-container');

    readonly plusNewButton = this.getByTestId('plus-new-btn');
    readonly uploadButton = this.getByTestId('upload-btn');
    readonly importButton = this.getByTestId('import-button');
    readonly createAppButton = this.getByTestId('create-app');
    readonly createPipelineButton = this.getByTestId('create-deployment-pipeline');
    readonly moreMenuButton = this.getByTestId('more-options-btn');
    readonly filterInput = this.getByTestId('tri-workspace-list-view-filter').locator('.tri-filter-input');
    readonly filterButton = this.getByTestId('tri-workspace-list-view-filter').locator('tri-filter-menu button');
    readonly lineageFilterInput = this.getByTestId('tri-workspace-lineage-view-filter');
    readonly listViewSwitcherButton = this.getByTestId('ListView_Switcher');
    readonly lineageViewSwitcherButton = this.getByTestId('LineageView_Switcher');
    readonly multiMoveButton = this.getByTestId('multi-move');
    readonly resetSelectionButton = this.getByTestId('reset-selection');

    readonly artifactList = this.locator('fluent-workspace-list');
    readonly workspaceListRow = this.page.getByTestId('workspace-list-content-view-row');

    fluentListColumns = (col: string) =>
        this.artifactList.getByTestId(`fluentListCell.${col}`);

    childIndicatorSvg = this.fluentListColumns('icon.childIndicator').locator('tri-svg-icon').locator('svg').locator('use');

    getArtifactByName(artifactName: string) {
        const allArtifacts = this.getByTestId('workspace-list-content-view-row');
        return new ArtifactRowComponent(allArtifacts.filter({ hasText: artifactName }));
    }

    getSingleArtifactByName(artifactName: string) {
        const allArtifacts = this.getByTestId('workspace-list-content-view-row');
        return new ArtifactRowComponent(allArtifacts.filter({ hasText: artifactName }).first());
    }

    async getAllItemNames(): Promise<string[]> {
        const rows = this.getByTestId('workspace-list-content-view-row');
        await rows.first().waitFor();
        const artifactRows = await rows.all();
        
        const itemNames = [];
        for(const row of artifactRows) {
            const itemName = await row.getByTestId('fluentListCell.name').textContent() ?? '';
            itemNames.push(itemName);
        }
        return itemNames;
    }

    async checkItem(itemName: string) {
        const item = await this.getSingleArtifactByName(itemName);
        await item.checkCurrentItem();
        return;
    }

    async navigateToSubfolderByClickBreadcrumbs(subfolderName?: string) {
        await this.breadcrumbs.navigateToSubfolder(subfolderName);
    }

    async navigateToSubfolderByClickItemInListView(subfolderName: string) {
        const item = this.getSingleArtifactByName(subfolderName);
        await item.nameCell.click();
    }

    async clickMultiMove() {
        await this.multiMoveButton.click();
    }

    async clickResetSelection() {
        await this.resetSelectionButton.click();
    }
    
    async waitForchildIndicator() {
        await this.fluentListColumns('icon.childIndicator').nth(0).waitFor();
    }
}