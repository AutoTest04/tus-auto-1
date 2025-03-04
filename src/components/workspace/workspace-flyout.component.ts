import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class WorkspaceFlyoutComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator(`tri-workspace-flyout`));
    }

    readonly searchBar = this.getByTestId('tri-search-box');
    readonly pinnedLabel = this.getByTestId('pinned-label');
    readonly allLabel = this.getByTestId('all-label');
    readonly addWorkspace = this.getByTestId('add-workspace');

    readonly myWorkspace = this.locator('.workspace-button-left:has-text("My workspace")');

    readonly workspaceButton = (workspaceName: string) => this.locator(`tri-workspace-button`).getByTitle(workspaceName);

    readonly navigateSampleWorkspace = (workspaceName: string) => this.locator(`.workspace-button-left[title="${workspaceName}"]`);
    readonly workspaceNotPinned = (workspaceName: string) =>
        this.locator(`tri-workspace-button .workspace-button-left[title="${workspaceName}"]`);
    readonly workspacePinned = (workspaceName: string) =>
        this.locator(`tri-workspace-button.pinned-workspace .workspace-button-left[title="${workspaceName}"]`);

    readonly workspaceToPinIcon = (workspaceName: string) =>
        this.locator(`tri-workspace-button .workspace-button-left[title="${workspaceName}"] + .workspace-button-right`).getByTestId('pin-button');
    readonly workspaceToUnpinIcon = (workspaceName: string) =>
        this.locator(`tri-workspace-button .workspace-button-left[title="${workspaceName}"] + .workspace-button-right`).getByTestId('unpin-button');
    readonly contextMenuIcon = (workspaceName: string) =>
        this.locator(`tri-workspace-button .workspace-button-left[title="${workspaceName}"] + .workspace-button-right`).getByTestId('open-menu');
}