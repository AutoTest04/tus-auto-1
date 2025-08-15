import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class SettingsPanel extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('user-settings-side-pane'));

    }

    readonly adminPortalButton = this.getByTestId('/admin-portal');
}