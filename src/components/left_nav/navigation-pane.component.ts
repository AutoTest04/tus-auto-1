import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class NavigationPaneComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator(`tri-nav-pane`));
    }

    readonly navBarMenu = this.getByTestId('navbar-mainMenu');
    readonly navBarButton = this.locator('tri-navbar-label-item');
    readonly workspaceSwitcherButton = this.locator('tri-workspace-switcher');
    readonly pinnedWorkspaceButton = this.locator('tri-pinned-workspaces');
    readonly productSwitcherButton = this.getByTestId('tri-product-switcher');

}