import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class DashboardContentComponent extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('dashboard-landing-container'));
    }

    readonly fileButton = this.getByTestId('actionbar-file-menu-btn');
    readonly shareButton = this.getByTestId('actionbar-share-btn');
    readonly commentButton = this.getByTestId('actionbar-comment-btn');



}