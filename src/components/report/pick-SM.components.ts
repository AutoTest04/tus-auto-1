import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class PickSMComponent extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('pbi-dialog-body'));
    }
    
    readonly filterSearchBox = this.getByTestId('keyword-search-filter');                        
    readonly triSplitMenuButton = this.getByTestId('tri-split-menu-btn');
    readonly generateBlankMenuItem = this.getByTestId('tri-split-menu-item').getByText(/blank/i);
    readonly firstPublishedDataset = this.getByTestId('datahub-list-table-row').nth(0);
}