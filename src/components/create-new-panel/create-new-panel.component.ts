//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class CreateNewPanelComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-create-new-panel'));
    }

    async setup(): Promise<void> {
        await this.root.waitFor();
    }

    readonly sections = this.locator('tri-create-new-section');
}
