import { BasePage, FeatureSwitches, Logger } from '@trident/e2e-common';
import { Locator, Page } from '@playwright/test';

export class PageCommon extends BasePage {
    readonly logger = new Logger('page.common');

    async gotoHome(featureSwitches?: FeatureSwitches) {
        this.logger.info(`gotoHome`);

        await this.goto('/home', {
            featureSwitches: {
                ...featureSwitches,

            },
            waitUntil: 'pbiresourceloaded',
        });
    }

    async gotoWorkspace(WSName: string) {
        this.logger.info(`gotoWorkspace ${WSName}`);

        await this.page.locator('//tri-workspace-switcher').click();
        await this.page.keyboard.type(WSName, { delay: 150 });
        const ws = this.page.getByRole('button', { name: WSName, exact: true });
        await ws.click({ trial: true }); // be sure it's ready to click
        await ws.click(); // real click
    }

    async gotoMyWorkspacePage(WSName: string): Promise<void> {
        await this.page.locator(`//button[@data-testid="navbar-label-item-${WSName}"]`).click();
    }

    async backToWorkspace() {
        await this.page.locator('//button[@role="menuitem" and contains(@class, "workspaceName") and contains(@class, "navbar-item")]').click();
    }
    
    constructor(public readonly page: Page) {
        super(page);
    }

}
