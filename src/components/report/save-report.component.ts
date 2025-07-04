import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class SaveReportComponent extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-subfolder-picker'));

    }
    readonly confirmButton = this.getByTestId('confirm-button');
    readonly reportNameInput = this.locator('[id="semanticInput"]');
}