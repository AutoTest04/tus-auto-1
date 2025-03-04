//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

import { BaseComponent, LocatorHost } from '@trident/e2e-common';

export class BrowseFilterPaneComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('filterMenuGroup.type'));
    }

    readonly closeButton = this.getByTestId('workspace-filter-pane-close-btn');
    readonly clearAllFilters = this.getByTestId('workspace-filter-pane-clear-btn');
    readonly filterPaneCheckbox = this.getByTestId('workspace-filter-pane-checkbox');
    readonly reportCheckbox = this.getByTestId('filterMenuItem.2');
    readonly dashboardCheckbox = this.getByTestId('filterMenuItem.1');
    readonly datasetCheckbox = this.getByTestId('filterMenuItem.dataset');
    readonly orgAppPreviewCheckbox = this.locator('[data-testid^="filterMenuItem.Org app"]');
}
