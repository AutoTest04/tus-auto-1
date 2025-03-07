import { expect, LocatorHost, BaseComponent } from '@trident/e2e-common';


export class AddAccessPanelComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('workspace-access-add-access-panel'));
    }


    readonly title = this.getByTestId('add-access-title');
    readonly backButton = this.getByTestId('add-access-back-btn');
    readonly dismissButton = this.getByTestId('add-access-dismiss-btn');
    readonly messageBar = this.getByTestId('add-access-message-bar');
    readonly addAccessStatus = this.getByTestId('add-access-add-access-status');
    readonly roleSelect = this.getByTestId('add-access-role-select');
    readonly addAccessButton = this.getByTestId('add-access-add-access-btn');
    readonly roleOptions = this.page.getByTestId('tri-role-select-option');

    async setup(): Promise<void> {
        await this.root.waitFor();
    }

    async back(): Promise<void> {
        await this.backButton.click();
    }


    async selectRole(role: string): Promise<void> {
        await this.roleSelect.click();
        await expect(this.roleOptions).toHaveCount(4);
        await this.roleOptions.filter({ hasText: role }).click();
    }
}
