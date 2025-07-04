import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class ReportContentComponent extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('report-content'));
    }

    readonly appBar = this.getByTestId('app-bar-content');
    readonly appBarRight = this.getByTestId('app-bar-right');
    readonly favoriteStarButton = this.getByTestId('favorite-button');
    readonly visualContainer = this.getByTestId('visual-container');
    readonly saveButton = this.getByTestId('appbar-save-menu-btn');
    readonly fileButton = this.getByTestId('appbar-save-menu-btn');
    readonly exportButton = this.getByTestId('appbar-save-menu-btn');
    readonly shareButton = this.getByTestId('appbar-share-menu-btn'); 
    readonly editButton = this.getByTestId('appbar-save-menu-btn');
    readonly saveReportButton = this.page.getByTestId('save-report-btn');
    readonly commentButton = this.getByTestId('appbar-comment-btn');

    readonly searchBox = this.getByTestId('search-bar-input');
}