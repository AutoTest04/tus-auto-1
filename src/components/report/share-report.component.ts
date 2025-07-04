import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class ShareReportComponent extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.locator('sharing-dialog'));

    }
    readonly emailsInput = this.getByTestId('emails-list-input');

    readonly messageInput = this.getByTestId('email-message');

}