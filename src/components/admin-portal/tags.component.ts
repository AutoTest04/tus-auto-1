import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class TagsTab extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.locator('tags-admin-portal-container'));

    }

    readonly newButton = this.getByTestId('tags-admin-container-create');

    async clickNewButton(): Promise<void> {
        await this.newButton.click();
    }
}