import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class shareDashboardComponent extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.locator('sharing-dialog'));
    }

    readonly confirmButton = this.getByTestId('grant-access-button');
    readonly emailInput = this.getByTestId('emails-list-input');

    async setup(): Promise<void> {
        await this.root.waitFor();
    }
}