import { BasePage, Logger } from '@trident/e2e-common';
import { Page } from '@playwright/test';

export class PageCommon extends BasePage {
    readonly logger = new Logger('page.common');

    async gotoHome() {
        this.logger.info(`gotoHome`);

        await this.goto('/home');
    }

    async gotoWorkspaceByID(workspaceObjectId: string): Promise<void> {
        await this.goto(`/groups/${workspaceObjectId}`);
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
