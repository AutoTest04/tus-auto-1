import { Page } from '@playwright/test';
import { BaseComponent } from '@trident/e2e-common';

export class ReleaseManagementComponent extends BaseComponent {
    constructor(page: Page) {
        super(page.locator(`service-app-release-status`));
    }

    // Testing stage
    readonly testingStage = this.getByTestId('stage.Testing');
    readonly getLinkTestingStageButton = this.testingStage.getByTestId('actionButton.getLink');
    readonly PromoteTestingStageButton = this.testingStage.getByTestId('actionButton.promote');

    // Pre-production stage
    readonly preProductionStage = this.getByTestId('stage.Pre-production');
    readonly getLinkPreProductionStageButton = this.preProductionStage.getByTestId('actionButton.getLink');
    readonly PromotePreProductionStageButton = this.preProductionStage.getByTestId('actionButton.promote');

    // Production stage
    readonly productionStage = this.getByTestId('stage.Production');
    readonly getLinkProductionStageButton = this.productionStage.getByTestId('actionButton.getLink');
}