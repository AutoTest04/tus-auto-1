import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class CreateWorkspaceComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator(`tri-create-workspace-blade`));
    }

    readonly descriptionSection = this.locator('.folder-description-box');
    readonly workspaceNameSection = this.getByTestId('workspace-create-name-input');

    readonly contactListSection = this.getByTestId('contact-list-section');
    readonly licenseModeSection = this.getByTestId('license-mode-section');

    readonly advancedButton = this.getByTestId('advanced-button');
    readonly cancelButton = this.locator('.cancel-buttons');
    readonly templateCheckBox = this.locator('.service-app-check-box');
    readonly createButton = this.getByTestId('workspace-create-apply-btn');
    readonly proLicenseButton = this.getByTestId('pro-license-button');

    readonly defaultDatasetStorageSection = this.getByTestId('default-dataset-storage-section');
    readonly defaultDatasetStorageTitle = this.getByTestId('default-dataset-storage-title');

    readonly learnMoreLink = this.locator('.learn-more-link');
}
