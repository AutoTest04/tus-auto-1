import { ArtifactService, Logger, Artifact } from '@trident/e2e-common';
import { PageCommon } from '../page.common';
import { Frame, Response } from '@playwright/test';

export const RUN_FOR_PERF_REGRESSION_DETECTION = process.env.RUN_FOR_PERF_REGRESSION_DETECTION ? true : false;
export const fastFailTimeout = 5 * 1000;
export const waitForLoadTimeout = 10 * 1000;
export const oneTimeBootTimeout = 1 * 60 * 1000;
export const runCellTimeout = 2 * 60 * 1000;
export const extendRunCellTimeout = 10 * 60 * 1000; // Only use this when the runCellTimeout above cannot succeed
const openNotebookTimeoutMs = 2 * 60 * 1000;

type IFrameType = 'page' | 'worker';

export class NotebookPage extends PageCommon {


    workspaceItem = (name: string) => `//button[@title="${name}"]`;
    selectNotebook = '//mat-sidenav-content[@class="mat-drawer-content mat-sidenav-content"]//div[@role="row"][contains(@class, "row")][1]//a';
    notebookStatus = '//button//div[contains(text(), "Saved")]';
    iFrame = '//tri-extension-page-outlet//iframe';
    defaultComment = '//html//body//div[contains(@class,"view-lines")]//div[@class="view-line"]//span[contains(text(), "Welcome")]';
    runCellBtn = '//button[@name="RunAll"]';
    addCodeBtn = '//div[@class="drag-handle-anchor"]//button[@aria-label="Add code cell"]';
    selectLanguageBtn = (arg: number) => `//div[@id="NotebookLanguageDropdown"]//button[@id="NotebookLanguage-list${arg}"]`;

    readonly toolbar = this.locator('div[role="toolbar"][class*="fui-Toolbar"]');
    readonly notebookPage = this.locator('//iframe[@data-testid="iframe-page-de-ds"]');

    readonly runAllBtn = this.notebookPage.locator('button').filter({ hasText: 'RunAll' });



    private readonly artifactService = this.createService(ArtifactService);
    public logger: Logger = new Logger('trident.page.notebook');

    async readClipboard() {
        // Wait for clipboard content to be ready
        await this.page.waitForTimeout(200);
        await this.page.evaluate(() => {
          const hiddenInput = document.createElement('textarea');
          hiddenInput.style.position = 'absolute';
          hiddenInput.style.opacity = '0';
          hiddenInput.style.left = '-9999px';
          hiddenInput.id = 'hidden-clipboard-input';
          document.body.appendChild(hiddenInput);
        });

        const hiddenInput = this.page.locator('#hidden-clipboard-input');
        await hiddenInput.focus();

        const pasteShortcut = process.platform === 'darwin' ? 'Meta+V' : 'Control+V';
        await this.page.keyboard.press(pasteShortcut);
        const clipboardContent = await hiddenInput.inputValue();

        await this.page.evaluate(() => {
          const hiddenInput = document.getElementById('hidden-clipboard-input');
          hiddenInput?.remove();
        });

        this.logger.info(`Clipboard content: ${clipboardContent.slice(0, 100)}`);
        return clipboardContent;
      }

      async openNotebook(wsName: string, nbName: string): Promise<void> {
        await this.gotoWorkspace(wsName);
        await this.gotoNotebook(nbName);
        await this.waitNotebookLoad(openNotebookTimeoutMs);
    }

    
    async createNotebook(wsName: string, timeoutMs = extendRunCellTimeout): Promise<void> {
        let duration = 0;
        let i = 1;
        while (duration < timeoutMs) {
            const wsButton = await this.page.$('//tri-workspace-switcher');
            if (wsButton) {
                await this.gotoWorkspace(wsName);
                await this.newNotebook();
                await this.waitNotebookLoad();
                break;
            } else {
                const closeButton = await this.page.$('//button[contains(text(), "Close")]');
                if (closeButton) {
                    await closeButton.click();
                }
            }
            await this.page.waitForTimeout(waitForLoadTimeout);
            duration = waitForLoadTimeout * i;
            i++;
        }
    }

    async renameNotebookOnNotebookPage(newName: string) {
        await this.page.locator('[data-testid="artifact-info-title"]').click({ timeout: 20000 });
        await this.page.locator('[data-testid="artifact-info-name-input"]').fill(newName, { timeout: 20000 });
        await this.page.waitForTimeout(fastFailTimeout);
        await this.page.locator('[data-testid="artifact-info-title"]').click({ timeout: 20000 });
    }

    async deleteNobookFromWorkspacePage(newName: string) {
        await this.page.locator('[data-testid="artifact-content-view"]').getByLabel(newName).hover({ timeout: 20000 });
        await this.page
            .getByRole('row', { name: `Select Row Notebook ${newName}` })
            .getByLabel('More options')
            .click();
        await this.page.waitForTimeout(fastFailTimeout);
        await this.page.locator('[data-testid="contextMenuItem\\.Delete"]').click();
        await this.page.waitForTimeout(fastFailTimeout);
        await this.page.locator('[data-testid="dailog-ok-btn"]').click();
    }

    async selectLanguage(name: string): Promise<void> {
        const iframe = await this.page.frameLocator('[data-testid="iframe-page-de-ds"]').first();
        const language = await iframe.locator('#NotebookLanguage-input').getAttribute('value');
        const flag = language?.indexOf(name);
        if (flag === -1) {
            await iframe.locator('#NotebookLanguagewrapper button').click();
            if (name === 'Python') {
                await iframe.locator(this.selectLanguageBtn(0)).click();
            } else if (name === 'Scala') {
                await iframe.locator(this.selectLanguageBtn(1)).click();
            } else if (name === 'SQL') {
                await iframe.locator(this.selectLanguageBtn(2)).click();
            } else {
                await iframe.locator(this.selectLanguageBtn(3)).click();
            }
        }
    }

    async gotoNotebook(nbName: string) {
        this.logger.info(`gotoNotebook ${nbName}`);
        await this.page.locator('//tri-search-box[@data-testid="keyword-search-filter"]//input[@data-testid="tri-search-box"]').click();
        await this.page.keyboard.type(nbName, { delay: 150 });
        await this.page.locator(this.selectNotebook).click();
    }

    async newNotebook() {
        await this.page.waitForTimeout(fastFailTimeout);
        await this.page.locator('//button[@data-testid="plus-new-btn"]').click();
        await this.page.waitForTimeout(fastFailTimeout);
        await this.page.locator('//button[contains(@data-testid, "notebook")][@role="option"]').click();
    }

    /**
     * Go to notebook page by id
     * @param workspaceId workspace id
     * @param artifactId artifact id
     */
    async gotoNotebookById(
        workspaceId: string,
        artifactId: string,
        featureSwitches?: Record<string, number | string | boolean>
    ): Promise<void> {
        const artifactType = 'synapsenotebooks';
        await this.goto(
            `/groups/${workspaceId}/${artifactType}/${artifactId}`,
            {
                waitUntil: 'pbiresourceloaded',
                featureSwitches: {
                    ...featureSwitches,
                    'debug.notebookTeachingTourDRL': 0,
                    'notebookChartEnhancement': 0,
                    'debug.disableNotebookCollaboration': 1,
                },
            }
        );
    }


    private async waitNotebookLoad(timeout = openNotebookTimeoutMs): Promise<void> {
        this.logger.info(`waitNotebookLoad, will time out in ${timeout}ms`);
        const iframe = await this.getDESFrame();
        await iframe.locator(`(//div[@aria-label="Run cell"])[1]`).waitFor({ timeout });
    }

    async getDESFrame(iframeType: IFrameType = 'page'): Promise<Frame> {
        this.logger.info(`Getting '${iframeType}' iframe`);
        // locator auto-waiting for de-ds page frame is visible
        await this.notebookPage.waitFor();
        const iframe = this.page.frames().find(e => e.url().includes('de-ds') && e.url().includes(iframeType));
        if (!iframe) {
            throw new Error(`Failed to get ${iframeType} frame`);
        }
        this.logger.info(`Got '${iframeType}' iframe`);
        return iframe;
    }

    async runAllCell(): Promise<void> {
        const iframe = await this.getDESFrame();
        await iframe.locator(this.runCellBtn).click();   
    }

}