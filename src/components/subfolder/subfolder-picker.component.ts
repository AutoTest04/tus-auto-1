import { LocatorHost, BaseComponent } from '@trident/e2e-common';
import { BreadcrumbComponent } from './breadcrumbs.component';
import { ArtifactRowComponent } from '../workspace/artifact-row.component';

export class SubfolderPickerComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-subfolder-picker'));
    }

    readonly breadcrumbs = new BreadcrumbComponent(this.root);
    readonly artifactList = this.getByTestId('artifact-content-view');
    readonly confirmButton = this.getByTestId('confirm-button');

    async setup(): Promise<void> {
        await this.root.waitFor();
    }

    async navigateToSubfolderByClickBreadcrumbs(subfolderName?: string) {
        await this.breadcrumbs.navigateToSubfolder(subfolderName);
    }

    async navigateToSubfolderByClickItemInListView(subfolderName?: string) {
        const rowComponent = await this.getRowItemInSubfolderPickerList(subfolderName);
        await rowComponent.nameCell.click();
    }

    async confirm(waitForMilliseconds?: number) {
        await this.confirmButton.click();
        if (waitForMilliseconds) {
            await this.page.waitForTimeout(waitForMilliseconds);
        }
    }

    async getRowItemInSubfolderPickerList(name?: string) {
        await this.artifactList.waitFor();
        const allItems = this.getByTestId('workspace-list-content-view-row');
        return new ArtifactRowComponent(allItems.filter({ hasText: name }));
    }
}
