import { Locator } from '@playwright/test';
import { BaseComponent } from '@trident/e2e-common';

export class ArtifactRowComponent extends BaseComponent {
    constructor(parent: Locator) {
        super(parent);
    }

    readonly nameCell = this.getByTestId('fluentListCell.name');
    readonly itemName = this.getByTestId('item-name');
    readonly typeCell = this.getByTestId('fluentListCell.type');
    readonly taskCell = this.getByTestId('fluentListCell.task');
    readonly shareButton = this.getByTestId('quick-action-button-Share');
    readonly optionsMenu = this.getByTestId('options-menu');
    readonly reportoptionsMenu = this.getByTestId('report-context-menu-button');
    readonly datasetOptionsMenu = this.getByTestId('dataset-options-menu-btn');

    readonly artifactMenu = this.page.locator(`//*[contains(@class, 'artifact-menu')]`);
    readonly managePermissionButton = this.artifactMenu.getByTestId('contextMenuItem.Manage permissions');
    readonly moveButton = this.artifactMenu.getByTestId('contextMenuItem.Move to');
    readonly deleteButton = this.artifactMenu.getByTestId('contextMenuItem.Delete');

    readonly reportdeleteButton = this.artifactMenu.getByTestId('reportContextMenuItem.Delete');
    readonly deleteButtonQuickAction = this.getByTestId('quick-action-button-Delete');
    readonly renameButton = this.artifactMenu.getByTestId('contextMenuItem.Rename');
    readonly checkbox = this.getByTestId('checkbox-btn');

    async openSharingDialog() {
        await this.nameCell.hover();
        await this.shareButton.click();
    }

    async openManagePermissionPage() {
        await this.openContextMenu();
        await this.managePermissionButton.click();
    }

    async openMoveDialog() {
        await this.openContextMenu();
        await this.moveButton.click();
    }

    async clickDelete() {
        await this.openContextMenu();
        await this.deleteButton.click();
    }

    async clickReportDelete() {
        await this.openReportContextMenu();
        await this.reportdeleteButton.click();
    }

    async clickDeleteQuickAction() {
        await this.nameCell.hover();
        await this.deleteButtonQuickAction.click();
    }

    async clickRename() {
        await this.openContextMenu();
        await this.renameButton.click();
    }

    async openContextMenu() {
        await this.nameCell.hover();
        await this.optionsMenu.click();
        await this.artifactMenu.waitFor();
    }

    async openDatasetContextMenu() {
        await this.nameCell.hover();
        await this.datasetOptionsMenu.click();
        await this.artifactMenu.waitFor();
    }

    async openReportContextMenu() {
        await this.nameCell.hover();
        await this.reportoptionsMenu.click();
        await this.artifactMenu.waitFor();
    }

    async checkCurrentItem() {
        await this.nameCell.hover();
        await this.checkbox.click();
    }
}