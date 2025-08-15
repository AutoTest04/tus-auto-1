import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class DuplicateCard extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('text-input-dialog'));
    }

    readonly inputName = this.getByTestId('dialog-text-input-field');
    readonly duplicateButton = this.getByTestId('dailog-ok-btn');
    readonly cancelButton = this.getByTestId('dailog-cancel-btn');



}