import { BasePage,interceptJson } from '@trident/e2e-common';

export class LeftNavPage extends BasePage {
    public readonly leftNavPane = this.page.getByTestId('triLeftNavPane');
    public readonly overflow = this.page.getByTestId('navbar-moreMenu');

    // we can get the locator in nav bar, including nav bar items, workspace switcher, pinned workspace, more menu and product switcher, the testId shold be displayName.toLowercase()
    public readonly leftNavItem = (testId: string) => this.leftNavPane.getByTestId(`navbar-label-item-${testId}`);
    public readonly overflowItem = (testId: string) => this.overflow.getByTestId(`navbar-label-item-${testId}`);

    public readonly showMoreToggle = this.page.getByTestId('toggle-show-more');
    public readonly createPageTitle = this.page.getByTestId('tri-create-new-card').nth(0);
    public readonly browsePagePivot = this.page.getByTestId('browsePivot.Recent');
    public readonly datahubHeader = this.page.getByTestId('datahub-header-v2');
    public readonly dialogIcon = this.page.getByTestId('navbarItem Dialog');
    public readonly dialogIframe = this.page.getByTestId('iframe-page-react-example');
    public readonly addWorkspaceButton = this.page.getByTestId('add-workspace');
    public readonly plusNewButton = this.page.getByTestId('plus-new-btn');

    readonly requestUrls = {
        baseMetadata: /.*\/metadata\/bootstrap\/base.*/,
        metadataNavPreferences: /.*\/metadata\/navpreferences.*/,
    };

    async setupLeftNav(): Promise<void> {
        await this.leftNavPane.waitFor();
    }

    async clickLeftNavItem(testId: string) {
        const item = this.leftNavItem(testId);
        await item.click();
    }

    async contextClickLeftNavItem(testId: string) {
        const item = this.leftNavItem(testId);
        await item.click({ button: "right" });
    }

    async clickPinMenu() {
        const item = this.page.getByTestId("pin-menu");
        await item.click();
    }

    async clickOverflowItem(testId: string) {
        await this.clickLeftNavItem('more...');
        const item = this.overflowItem(testId);
        await item.click();
    }

    async clickMoreMenu() {
        await this.clickLeftNavItem('more...');
        await this.overflow.waitFor();
    }

    async isNavItemVisible(testId: string, inOverflow = false) {
        if (inOverflow) {
            await this.overflowItem(testId).waitFor();
            return this.overflowItem(testId).isVisible();
        } else {
            await this.leftNavItem(testId).waitFor();
            return this.leftNavItem(testId).isVisible();
        }
    }

    async isNavItemHidden(testId: string, inOverflow = false) {
        if (inOverflow) {
            return await this.overflowItem(testId).isHidden();
        } else {
            return await this.leftNavItem(testId).isHidden();
        }
    }

    async getNavItemsIds(inOverflow?: boolean): Promise<string[]> {
        const navItems = inOverflow ? this.overflow.getByRole('menuitem') : this.leftNavPane.getByRole('menuitem');
        const res = [];
        for(const navItem of await navItems.all()) {
            const testId = await navItem.getAttribute('data-testid');
            if(testId) {
                res.push(testId.replace('navbar-label-item-', ''));
            }
        }
        return res;
    }

    /**
     * FunctionHub shown is decided by feature switch. It will affect the stability of e2e test.
     * Although we set the fs: false, we can also make sure the overall behavior of left nav.
     */
    async gotoPage(url = '/', experience = 'api-playground'): Promise<void> {
        await this.goto(url, { featureSwitches: {
            experience,
            functionsHubEntry: 0,
            oneRiverHubPage: 0,
            immersiveCopilotContextSelection: 0,
            onelakeCatalog_HEAD_Datahub_FE: 0,
        } });
    }

}
