import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class BreadcrumbComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-subfolder-breadcrumbs'));
    }

    async setup(): Promise<void> {
        await this.root.waitFor();
    }

    async navigateToSubfolder(subfolderName?: string) {
        if (!subfolderName) {
            const workspaceButton = this.getByTestId('workspace-button');
            await workspaceButton.click();
        } else {
            await this.getByTestId('subfolder-button').filter({ hasText: subfolderName }).click();
        }
    }
}
