//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
import { Page } from '@playwright/test';
import { BaseComponent } from '@trident/e2e-common';

export class SimpleTemplateDialogComponent extends BaseComponent {
    constructor(page: Page) {
        super(page.locator('simple-template-dialog'));
    }

    readonly cancelButton = this.root.getByTestId('dailog-cancel-btn');
    readonly okButton = this.root.getByTestId('dailog-ok-btn');
    readonly errorMessage = this.root.getByTestId('error-message');
}
