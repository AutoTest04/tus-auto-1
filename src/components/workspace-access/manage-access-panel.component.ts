import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class ManageAccessPanelComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('workspace-access-manage-access-panel'));
    }

    readonly title = this.getByTestId('manage-access-title');
    readonly dismissButton = this.getByTestId('manage-access-dismiss-btn');
    readonly addAccessButton = this.getByTestId('manage-access-add-access-btn');
    readonly search = this.getByTestId('member-access-search');
    readonly memberInfo = this.getByTestId('member-info');
    readonly memberSelect = this.getByTestId('mat-select-trigger');

    async setup(): Promise<void> {
        await this.root.waitFor();
    }

    async openAddAccessPanel(): Promise<void> {
        await this.setup();

        await this.addAccessButton.click();
    }
}
