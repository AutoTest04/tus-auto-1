//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
import { Page } from '@playwright/test';
import { BaseComponent } from '@trident/e2e-common';

export class PackageSuccessComponent extends BaseComponent {
    constructor(page: Page) {
        super(page.locator('package-success-dialog'));
    }

    readonly appUrlInput = this.root.getByTestId('app-url-input');
    readonly closeButton = this.root.getByTestId('close-button');
}
