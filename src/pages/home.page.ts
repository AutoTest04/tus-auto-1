import { BasePage, createService, FeatureSwitchRecord, IdentityService } from '@trident/e2e-common';

import { HeaderComponent } from '../components/header/header.component';
import { RecommendationComponent } from '../components/home/recommendation.component';

export class HomePage extends BasePage {
    readonly recommendation = new RecommendationComponent(this.page);
    readonly header = new HeaderComponent(this.page);
    readonly recommendedShiftRight = this.page.getByTestId('carousel-shiftRight-btn');
    readonly quickAccessRecent = this.page.getByTestId('quick-access-recent');
    readonly quickAccessFavorite = this.page.getByTestId('quick-access-favorites');
    readonly quickAccessShared = this.page.getByTestId('quick-access-shared');
    readonly inputField = this.page.getByTestId('keyword-search-filter');
    readonly workspaceCreatePanel = this.page.getByTestId('workspace-create-panel');
    readonly workspaceCreateApply = this.workspaceCreatePanel.getByTestId('workspace-create-apply-btn');
    readonly createGeneralTaskFlow = this.locator('[aria-label="General"]').locator('visible=true');
    readonly selectTaskflow = this.locator('[data-testlabel="Select"]');
    readonly fromExternalOrgs = this.page.getByTestId('list-section-pill-container-GuestContentListTitle');
    readonly testItemEditorPage = this.frameLocator('iframe[data-testid="iframe-page-Org.E2ETestWorkloadCst"]').first();
    readonly publicItemEditorPage = this.frameLocator('iframe[data-testid="iframe-page-Fabric.E2ETestWorkloadPublic"]').first();
    
    async getWorkspaceName(): Promise<string>{
        const identityService = createService(this.page, IdentityService);
        const workspaceName = identityService.create(`trident_test_workspace_{uuid}_{timestamp}`);
        return workspaceName;
    }

    async gotoHome(experience = 'api-playground', clientFeatureSwitches?: FeatureSwitchRecord): Promise<void> {
        await this.goto('/', {
            featureSwitches: {
                experience,
                globalSkipToMainContent: 0,
                ...clientFeatureSwitches,
            },
        });
    }

    async gotoHomeWithRecommend(experience = 'api-playground'): Promise<void> {
        await this.goto('/', {
            featureSwitches: {
                experience,
                globalSkipToMainContent: 0,
                isE2ERun2: 0,
            },
        });
    }

    /**
     * Place a string in the 'Filter by keyword' search box.
     *
     * @param sampleText - The string to place in the search box
     */
    public async inputToKeywordFilter(sampleText: string) {
        // the search component is used in multiple places, so the selector is on the
        //      desired instance (i.e., filter by keyword).  Then we have to get to
        //      the internal input element.
        const searchBox = this.inputField.getByTestId('tri-search-box');
        await searchBox.fill(sampleText);
    }

    async inputToWrokSpaceName (name: string){
        const nameBox = this.workspaceCreatePanel.getByTestId('workspace-create-name-input');
        await nameBox.fill(name);
    }

    async setupRecommendation(): Promise<void> {
        await this.gotoHome();
        await this.recommendation.root.waitFor();
    }

    async setupHeader(experience = 'api-playground', fabricDeveloperExperience?: boolean): Promise<void> {
        await this.header.waitForLoaded(this.gotoHome(
            experience,
            fabricDeveloperExperience !== undefined ? { fabricDeveloperExperience } : undefined,
        ));
    }

    async pressKey(key: string, delay?: number): Promise<void> {
        await this.page.keyboard.press(key, { delay });
    }

    async getUserAccessToken(): Promise<string> {
        return await this.page.evaluate(() => window.powerBIAccessToken ?? '');
    }

    async getUserAccessTokenWithScope(scopes: string[]): Promise<string> {
        return await this.page.evaluate(async (scopes) => {
            if (!window.msalClientApplication) {
                console.error("MSAL client application is not initialized.");
                return '';
            }
    
            const accounts = window.msalClientApplication.getAllAccounts();
            if (accounts.length === 0) {
                console.error("No user accounts found. Ensure the user is logged in.");
                return '';
            }
    
            try {
                const tokenResponse = await window.msalClientApplication.acquireTokenSilent({
                    scopes: scopes,
                    account: accounts[0]
                });
    
                return tokenResponse.accessToken;
            } catch (error) {
                console.error("Failed to acquire token:", error);
                return '';
            }
        }, scopes);
    }

    async getApiUri(): Promise<string> {
        return await this.page.evaluate(() => (<any>window).apiUri ?? '');
    }

    public onConsole(func: (event: any) => void) {
        return this.page.on('console', func);
    }
}
