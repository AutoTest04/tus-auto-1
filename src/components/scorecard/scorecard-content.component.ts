import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class ScorecardContentComponent extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.locator('scorecard-page'));
    }

    readonly commandBar = this.locator('scorecard-command-bar');

    readonly titleLable = this.getByTestId('scorecard-title');

    readonly textLable = this.titleLable.locator('pbi-text-label');

    readonly editTitleIcon = this.titleLable.getByTestId('edit-scorecard-title');
    readonly shareButton = this.getByTestId('action-bar-share-menu-btn');
    readonly goalnameinput = this.getByTestId('goal-name-input-box');

    readonly saveButton = this.getByTestId('button-save');

    readonly newButton = this.locator('scorecard-new-button');

    readonly filter = this.locator('scorecard-filter');




}