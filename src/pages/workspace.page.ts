import { ArtifactService, BasePage, FeatureSwitches, GotoOptions, SubfolderService, Workspace, WorkspaceService, interceptJson, } from '@trident/e2e-common';
import { v4 } from 'uuid';
import { NavigationPaneComponent } from '../components/navigation-pane.component';
import { WorkspaceViewComponent } from '../components/workspace/workspace-view.component';

export interface WorkspacePageConfig {
    workspaceObjectId?: string;
    product?: string;
}

export class WorkspacePage extends BasePage {
    readonly navigationPane = new NavigationPaneComponent(this.page);
    readonly workspaceView = new WorkspaceViewComponent(this.page);
    readonly workspaceService = this.createService(WorkspaceService);
    readonly artifactService = this.createService(ArtifactService);

    readonly plusNewMenu = this.getByTestId('plus-new-menu');
    readonly plusNewMenuMoreOptionsButton = this.plusNewMenu.getByTestId('more-options-btn');

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

    async gotoWorkspace(workspaceObjectId: string): Promise<void> {
        await this.goto(`/groups/${workspaceObjectId}`);
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

    async clickMoreOptions(): Promise<void> {
        await this.workspaceView.plusNewButton.click();
        await this.plusNewMenuMoreOptionsButton.click();
    }

}

function createUniqWorkspaceName(workspaceDoamin = ''): string {
    return `trident_${workspaceDoamin}_${v4()}`;
}