import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class ItemCreation extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('text-input-dialog'));

    }
    readonly newCardInput = this.locator('mat-form-field');
    readonly createBtn = this.getByTestId('dailog-ok-btn');

}