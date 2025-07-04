import { ArtifactService, FeatureSwitches, GotoOptions, Workspace, WorkspaceService, } from '@trident/e2e-common';
import { v4 } from 'uuid';
import { NavigationPaneComponent } from '../components/navigation-pane.component';
import { WorkspaceViewComponent } from '../components/workspace/workspace-view.component';
import { WorkspaceFlyoutComponent } from '../components/workspace/workspace-flyout.component';
import { TriListFilterComponent } from '../components/tri-list-filter/tri-list-filter.component';
import { PageCommon } from './page.common';



export interface WorkspacePageConfig {
    workspaceObjectId?: string;
    product?: string;
}

export class WorkspacePage extends PageCommon {
    readonly navigationPane = new NavigationPaneComponent(this.page);
    readonly workspaceFlyout = new WorkspaceFlyoutComponent(this.page);
    readonly workspaceView = new WorkspaceViewComponent(this.page);

    readonly triListFilter = new TriListFilterComponent(this.page);

    readonly workspaceService = this.createService(WorkspaceService);
    readonly gitIntegrationSettingsButton = this.locator('button').getByText('git integration');
    readonly general = this.locator('button').getByText('general');
    readonly artifactService = this.createService(ArtifactService);
    readonly EditButton = this.locator('button').getByText('Edit')
    readonly buttonLocator = (buttonText: string) => this.locator('button').getByText(buttonText);
    readonly workspaceSettingsPanel = this.getByTestId('settings-full-panel');
    readonly workspaceSettingsLeftNavPane = this.getByTestId('tri-navigation-panel-tabs-in-workspace-settings');
    readonly manageAccessButton = this.getByTestId('manage-access').locator('visible=true');
    readonly settingsButton = this.getByTestId('workspace-settings').locator('visible=true');
    readonly licensemode = this.locator('#tri-radio-button-1');
    readonly selectlicense = this.locator('button').getByText('Select license')

    readonly plusNewMenu = this.getByTestId('plus-new-menu');

    readonly plusNewMenuButtons = this.plusNewMenu.locator(`button`);
    readonly plusNewMenuMoreOptionsButton = this.plusNewMenu.getByTestId('more-options-btn');

    readonly importMenu = this.locator('tri-menu-other.themeableElement.tri-menu-with-icons[role="menu"]');
    readonly importNotebookMenu = this.locator('tri-menu-other.themeableElement.tri-menu-with-icons[aria-activedescendant="Notebook_Local"]');
    
    readonly descriptionInput = this.getByTestId('workspace-settings-general-description-input');

    readonly importNotebookButton = this.importMenu.locator('button[aria-label="Notebook"]');
    readonly importReportButton = this.importMenu.locator('button[aria-label="Report, Paginated Report or Workbook"]');

    readonly ftcButton = this.importNotebookMenu.locator('button[aria-label="From this computer"]');

    readonly importPanel = this.frameLocator("[data-testid='iframe-panel-de-ds']");

    readonly uploadButton = this.importPanel.locator('button').filter({ hasText: 'Upload' });
    fluentListColumns = (col: string) =>
        this.workspaceView.getByTestId(`fluentListCell.${col}`);
    navbarItem = (objectId: string) =>
        this.navigationPane.getByTestId(`navbarItem ${objectId}`);
    navbarItemCloseBtn = (objectId: string) =>
        this.navigationPane.getByTestId(`navbarItem ${objectId}`).getByTestId('tab-close');

    async reloadPage(): Promise<void> {
        await this.page.reload();
        await this.workspaceView.root.waitFor();
    }

    //#region workspace()
    async createWorkspace(capacityObjectId?: string, workspaceDomain?: string): Promise<Workspace> {
        const workspace = await this.workspaceService.createWorkspace({
            prefix: createUniqWorkspaceName(workspaceDomain),
            capacityObjectId,
        });

        await this.page.reload();
        return workspace;
    }

    async goToMyWorkspace(): Promise<void> {
        await this.goto('/groups/me/list');
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

    async gotoWorkspacebyid(workspaceObjectId: string): Promise<void> {
        await this.goto(`/groups/${workspaceObjectId}`);
    }


    async goToWorkspaceSettings(checkMoreSettingsButton = false, listname: string = 'General'): Promise<void> {
        await this.goToWorkspaceSettingsMain(checkMoreSettingsButton);
        const button = this.buttonLocator(listname);
        await button.click();
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

    async inputDescription(description: string): Promise<void> {
        await this.descriptionInput.fill(description);
    }

    async openImportMenu(): Promise<void> {
        await this.workspaceView.importButton.click();
    }

    async importNotebook(): Promise<void> {
        const fileChooserPromise = this.page.waitForEvent('filechooser');
        await this.openImportMenu();
        await this.importNotebookButton.click();
        await this.ftcButton.click();
        await this.uploadButton.click();
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles('./Data science scenario.ipynb');
    }
    //#endregion

    //#region left nav()
    async openWorkspaceFlyout() {
        if (await this.isFlyoutCollapsed()) {
            await this.navigationPane.workspaceSwitcherButton.click();
        }
    }
    async isFlyoutExpanded(): Promise<boolean> {
        return await this.workspaceFlyout.root.isVisible();
    }

    async isFlyoutCollapsed(): Promise<boolean> {
        return await this.workspaceFlyout.root.isHidden();
    }


    //#endregion

    //#region artifact()

    async openNewItemPanel(): Promise<void> {
        await this.workspaceView.plusNewButton.click();
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

    async clickItemByName(name: string): Promise<void> {
        const items = await this.workspaceView.getSingleArtifactByName(name);
        await items.itemName.click();
    }

    async filterItemByName(name: string): Promise<void> {
        await this.triListFilter.searchText(name);
    }

    async deleteItem( artifactDisplayName: string) {
        await this.filterItemByName(artifactDisplayName);
        await this.workspaceView.getSingleArtifactByName(artifactDisplayName).clickDelete();
    }

    async deleteReport( artifactDisplayName: string) {
        await this.filterItemByName(artifactDisplayName);
        await this.workspaceView.getSingleArtifactByName(artifactDisplayName).clickReportDelete();
    }
    //#endregion
    async clickMoreOptions(): Promise<void> {
        await this.workspaceView.plusNewButton.click();
        await this.plusNewMenuMoreOptionsButton.click();
    }


}

function createUniqWorkspaceName(workspaceDoamin = ''): string {
    return `trident_${workspaceDoamin}_${v4()}`;
}