import { ArtifactService, BasePage, FeatureSwitches, GotoOptions, SubfolderService, Workspace, WorkspaceService, interceptJson, } from '@trident/e2e-common';
import { v4 } from 'uuid';
import { Locator } from '@playwright/test';

import { ExtensionPanelOutletComponent } from '../components/workspace/extension-panel-outlet.component';
import { NavigationPaneComponent } from '../components/left_nav/navigation-pane.component';
import { PackageSuccessComponent } from '../components/template-apps/package-success.component';
import { ReleaseManagementComponent } from '../components/workspace/release-managment.component';
import { SimpleTemplateDialogComponent } from '../components/dialog/simple-template-dialog.component';
import { TriListFilterComponent } from '../components/tri_list_filter/tri-list-filter.component';
import { TriPillBarComponent } from '../components/tri_pill_bar/tri-pill-bar.component';
import { WorkspaceFlyoutComponent } from '../components/workspace/workspace-flyout.component';
import { WorkspaceViewComponent } from '../components/workspace/workspace-view.component';
import { AddAccessPanelComponent } from '../components/workspace_access/add-access-panel.component';
import { ManageAccessPanelComponent } from '../components/workspace_access/manage-access-panel.component';
import { SubfolderNamingDialogComponent } from '../components/subfolder/subfolder-naming-dialog.component';
import { SubfolderPickerComponent } from '../components/subfolder/subfolder-picker.component';
import { CreateNewPanelComponent } from '../components/create-new-panel/create-new-panel.component';

export interface WorkspacePageConfig {
    workspaceObjectId?: string;
    product?: string;
}
export class WorkspacePage extends BasePage {
    readonly navigationPane = new NavigationPaneComponent(this.page);
    readonly workspaceFlyout = new WorkspaceFlyoutComponent(this.page);
    readonly workspaceView = new WorkspaceViewComponent(this.page);
    readonly extensionPanelOutlet = new ExtensionPanelOutletComponent(this.page);
    readonly releaseManagementPane = new ReleaseManagementComponent(this.page);
    readonly packageSuccessDialog = new PackageSuccessComponent(this.page);
    readonly simpleDialog = new SimpleTemplateDialogComponent(this.page);
    readonly triListFilter = new TriListFilterComponent(this.page);
    readonly triPillBar = new TriPillBarComponent(this.page, 'tri-workspace-pill-filter');
    readonly subfolderPicker = new SubfolderPickerComponent(this.page);
    readonly subfolderNamingDialog = new SubfolderNamingDialogComponent(this.page);
    readonly manageAccessPanel = new ManageAccessPanelComponent(this.page);
    readonly addAccessPanel = new AddAccessPanelComponent(this.page);
    readonly createNewPanel = new(CreateNewPanelComponent)(this.page);

    // menus are on cdf overlay and not any of the component's child element, so we can only put them here.
    readonly overLay = this.locator('xpath=//*[@class="cdk-overlay-container"]');
    readonly plusNewMenu = this.getByTestId('plus-new-menu');
    readonly plusNewMenuButtons = this.plusNewMenu.locator(`button`);
    readonly plusNewMenuButton = (buttonIndex: number) => this.plusNewMenuButtons.nth(buttonIndex);
    readonly plusNewMenuMoreOptionsButton = this.plusNewMenu.getByTestId('more-options-btn');
    readonly plusNewMenuReportButton = this.plusNewMenu.getByTestId(`artifact_report`);
    readonly plusNewMenuSubfolderButton = this.plusNewMenu.getByTestId(`folder`);
    readonly plusNewMenuVariablesButton = this.plusNewMenu.getByTestId(`trident_variables`);
    readonly uploadButtonMenu = this.getByTestId('upload-menu');
    readonly workspaceSettingsPanel = this.getByTestId('settings-full-panel');
    readonly workspaceSettingsLeftNavPane = this.getByTestId('tri-navigation-panel-tabs-in-workspace-settings');
    readonly manageAccessButton = this.getByTestId('manage-access').locator('visible=true');
    readonly settingsButton = this.getByTestId('workspace-settings').locator('visible=true');
    readonly filterPanel = this.getByTestId('filterMenu');
    readonly createPipelineDialog = this.locator('p.create-pipeline-dialog-description');
    readonly createAppDialog = this.locator('xpath=//simple-dialog');
    readonly createAppButton = this.page.getByTestId('create-app').locator('visible=true');
    readonly releaseManagementButton = this.page.getByTestId('release-management');
    // workspace flyout
    readonly flyoutManageAccessIcon = this.getByTestId('Workspace access');
    readonly flyoutWorkspaceSettingsIcon = this.getByTestId('Workspace settings');
    // workspace settings panel
    readonly gitIntegrationSettingsButton = this.locator('button').getByText('git integration');
    readonly artifactService = this.createService(ArtifactService);
    readonly workspaceService = this.createService(WorkspaceService);
    readonly subfolderService = this.createService(SubfolderService);

    readonly dialog = this.getByTestId('dailog-ok-btn');
    readonly deleteBtn = this.getByTestId('contextMenuItem.Delete');
    readonly settingsBtn = this.getByTestId('contextMenuItem.Settings');
    readonly versionHistoryBtn = this.getByTestId('datasetContextMenuItem.Version history');
    readonly deleteBtnInDialog = this.getByTestId('dailog-ok-btn').filter({ hasText: 'Delete' });
    readonly navbarlabelitem = this.navigationPane.locator(`tri-navbar-label-item`);
    readonly plusNewBtn = this.getByTestId('plus-new-btn');
    readonly itemSettingsPanel = this.frameLocator('[data-testid^="iframe-panel-Org"]').first();
    readonly migrationBtn = this.getByTestId('migration-btn');

    fluentListColumns = (col: string) =>
        this.workspaceView.getByTestId(`fluentListCell.${col}`);
    navbarItem = (objectId: string) =>
        this.navigationPane.getByTestId(`navbarItem ${objectId}`);
    navbarItemCloseBtn = (objectId: string) =>
        this.navigationPane.getByTestId(`navbarItem ${objectId}`).getByTestId('tab-close');
    optionMenuBtn = (col: string, artifactName: string) =>
        this.workspaceView.getByTestId(`fluentListCell.${col}`).filter({ hasText: artifactName }).getByTestId('options-menu');
    datasetOptionMenuBtn = (col: string, artifactName: string) =>
        this.workspaceView.getByTestId(`fluentListCell.${col}`).filter({ hasText: artifactName }).getByTestId('dataset-options-menu-btn');
    quickActionButton = (col: string, artifactName: string) =>
        this.workspaceView.getByTestId(`fluentListCell.${col}`).filter({ hasText: artifactName }).getByTestId('quick-action-button-Quick action name English');
    contextMenuItemBtn = (action: string) =>
        this.getByTestId(`contextMenuItem.${action}`);
    fluentListItem = (artifactName: string) =>
        this.workspaceView.getByTestId(`fluentListCell.name`).filter({ hasText: artifactName }).getByTestId('item-name');

    readonly requestUrls = {
        groupMetadata: /.*\/powerbi\/metadata\/groupmetadata.*/
    };

    async reloadPage(): Promise<void> {
        await this.page.reload();
        await this.workspaceView.root.waitFor();
    }

    async createWorkspace(capacityObjectId?: string, workspaceDomain?: string): Promise<Workspace> {
        const workspace = await this.workspaceService.createWorkspace({
            prefix: createUniqWorkspaceName(workspaceDomain),
            capacityObjectId,
        });

        await this.page.reload();
        return workspace;
    }

    async createArtifact(workspaceObjectId: string, artifactType: string, parentSubfolderId?: number, artifactName?: string, workloadPayload?: string) {
        return this.artifactService.createArtifact({
            workspaceId: workspaceObjectId,
            artifactType,
            description: 'test report artifact',
            payloadContentType: 'InlinePlainText',
            displayName: artifactName ?? this.artifactService.getUniqueArtifactName('TestWorkspace'),
            subfolderId: parentSubfolderId,
            workloadPayload
        });
    }

    async createSubfolder(workspaceObjectId: string, displayName: string, parentSubfolderId?: number) {
        return await this.subfolderService.createSubfolder(workspaceObjectId, displayName, parentSubfolderId);
    }

    async openFluentListItem(artifactName: string) {
        await this.fluentListItem(artifactName).click();
    }

    async openCreateSubfolderDialog() {
        await this.workspaceView.plusNewButton.click();
        await this.plusNewMenuSubfolderButton.click();
    }

    async openCreateVariablesDialog() {
        await this.workspaceView.plusNewButton.click();
        await this.clickMoreOptions();
        await this.plusNewMenuVariablesButton.click();
    }

    async goToMyWorkspace(): Promise<void> {
        await this.goto('/groups/me/list');
    }

    async openWorkspaceFlyout() {
        if (await this.isFlyoutCollapsed()) {
            await this.navigationPane.workspaceSwitcherButton.click();
        }
    }

    async closeWorkspaceFlyout(): Promise<boolean> {
        await this.workspaceFlyout.root.isVisible();
        await this.overLay.click();
        return this.isFlyoutCollapsed();
    }

    async isFlyoutExpanded(): Promise<boolean> {
        return await this.workspaceFlyout.root.isVisible();
    }

    async isFlyoutCollapsed(): Promise<boolean> {
        return await this.workspaceFlyout.root.isHidden();
    }

    async goToWorkspce(config?: WorkspacePageConfig, featureSwitches?: FeatureSwitches): Promise<void> {
        const options = <GotoOptions>{
            featureSwitches: {
                experience: config?.product || `power=bi`,
                ...featureSwitches
            }
        };
        await this.goto(`/groups/${config?.workspaceObjectId || 'me'}/list`, options);
        await this.workspaceView.root.waitFor();
    }

    async gotoWorkspace(workspaceObjectId: string, options?: GotoOptions): Promise<void> {
        await this.goto(`/groups/${workspaceObjectId}`, options);
    }

    async changeLanguageOfPageTo(locale: string): Promise<void> {
        const url = new URL(this.page.url());
        url.searchParams.set('language', locale);
        await this.page.goto(url.toString());
    }

    async clickNavBarItem(navbarItem: Locator) {
        const button = navbarItem.locator(`[data-testid^="navbar-label-item"]`);
        await button.click();
    }

    async gotoDatasetDetailsPage(groupId: string, datasetId: string, featureSwitches?: FeatureSwitches): Promise<void> {
        const options = <GotoOptions>{
            featureSwitches: {
                ...featureSwitches
            }
        };
        const url = `/groups/${groupId}/datasets/${datasetId}/details/`;

        await this.goto(url, options);
    }

    async gotoDatasetSettingsPage(groupId: string, datasetId: string, featureSwitches?: FeatureSwitches): Promise<void> {
        const options = <GotoOptions>{
            featureSwitches: {
                ...featureSwitches
            }
        };
        const url = `/groups/${groupId}/settings/datasets/${datasetId}/`;

        await this.goto(url, options);
    }

    async goToWorkspaceSettings(checkMoreSettingsButton = false): Promise<void> {
        await this.goToWorkspaceSettingsMain(checkMoreSettingsButton);
        await this.gitIntegrationSettingsButton.click();
    }

    async goToWorkspaceSettingsMain(checkMoreSettingsButton = false): Promise<void> {
        if (checkMoreSettingsButton && await this.workspaceView.moreMenuButton.isVisible()) {
            await this.workspaceView.moreMenuButton.click();
        }
        else {
            const settingsButtonVisible = await this.settingsButton.isVisible();
            if (!settingsButtonVisible) {
                await this.workspaceView.moreMenuButton.click();
            }
        }

        await this.settingsButton.click();
        await this.workspaceSettingsPanel.waitFor();
    }

    async clickActionBarButton(button: Locator) {
        if (await button.isHidden()) {
            await this.workspaceView.moreMenuButton.click();
        }
        await button.click();
    }

    async clickMoreOptions(): Promise<void> {
        await this.workspaceView.plusNewButton.click();
        await this.plusNewMenuMoreOptionsButton.click();
    }


    async getLinkFromSuccessDialog(): Promise<string> {
        await this.packageSuccessDialog.root.waitFor();
        const appUrl = await this.packageSuccessDialog.appUrlInput.inputValue();

        return appUrl;
    }


    async clickWorkspaceSettingsTab(tabName: string): Promise<void> {
        const tabBtn = this.workspaceSettingsLeftNavPane.getByText(tabName);
        await tabBtn.click();
    }
}

function createUniqWorkspaceName(workspaceDoamin = ''): string {
    return `trident_${workspaceDoamin}_${v4()}`;
}
