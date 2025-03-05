import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class SubfolderNamingDialogComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-subfolder-naming-dialog'));
    }

    readonly title = this.getByTestId('title');
    readonly input = this.getByTestId('input');
    readonly errors = this.getByTestId('error');
    readonly confirmButton = this.getByTestId('confirm-button');

    async setup(): Promise<void> {
        await this.root.waitFor();
    }
}
