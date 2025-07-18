import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../../pages/workspace.page';
import { PlusNewPanelPage } from '../../pages/plus-new-panel.page';
import { NotebookPage } from '../../pages/notebook/notebook.page';
import { TestDocBuilder } from '../../utils/test-doc-builder';
import { loadSampleData, loadTestCases } from '../../utils/testdata-loader';

const logger = new Logger('workspace-view.tests');

const sampleData = loadSampleData();
const testCases = loadTestCases();

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.p('plusNewPanelPage', PlusNewPanelPage)
.s('capacity', FabricCapacityService)
.p('NotebookPage', NotebookPage)

const docbuilder = new TestDocBuilder(sampleData);


test.describe.serial('GB18030', () => {

    test.beforeEach(async ({ workspacePage, page, NotebookPage }) => {

        await workspacePage.goToMyWorkspace();

        await page.waitForTimeout(1000);


        await NotebookPage.gotoWorkspace('GB18030test01');
    });

    test.afterAll(async () => {
        await docbuilder.save("Workspace测试文档.docx");
        logger.info('Test document saved successfully.');
    });

    test('工作区中使用搜索并排序', async ({ workspacePage, page}) => {
        owner('v-jiaqihou');

        const id = '3.10.1';

        await workspacePage.filterItemByName(docbuilder.getShort(0))
        await workspacePage.triListFilter.toFullScreenshot(id + '-2.png');
        await workspacePage.triListFilter.toHaveScreenshot(id + '1.png');

        const summaryImagePath = id + '-2.png';
        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 2 ? id + '1.png' : undefined
                })),
                summaryImagePath
            });
        }

    });
    test('工作区设置', async ({ workspacePage, page}) => {
        owner('v-jiaqihou');

        const id = '3.10.2';
        await retry(async () => {
            if (!await workspacePage.settingsButton.isVisible()) {
                await workspacePage.workspaceView.moreMenuButton.click();
                logger.info(`workspace settings button is invisible, click the menu button`);
            }
           // a relative short timeout to fast retry
            await workspacePage.settingsButton.click({timeout: 2 * 1000});
        }, { times: 3 });

        await workspacePage.inputDescription(docbuilder.getShort(0))
        await workspacePage.triListFilter.toFullScreenshot(id + '-1.png');

        await workspacePage.triListFilter.toFullScreenshot(id + '-2.png');

        const summaryImagePath = id + '-2.png';

        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 2 ? id + '1.png' : undefined
                })),
                summaryImagePath
            });
        }

    });

    test('工作区成员管理', async ({ workspacePage }) => {
        owner('v-jiaqihou');

        const id = '3.10.3';

        await retry(async () => {
            if (!await workspacePage.manageAccessButton.isVisible()) {
                await workspacePage.workspaceView.moreMenuButton.click();
                logger.info(`manage access button is invisible, click the menu button`);
            }
            await workspacePage.manageAccessButton.click({ timeout: 2 * 1000 });
        }, { times: 3 });

        await expect(workspacePage.manageAccessPanel.root).toBeVisible();

        await workspacePage.triListFilter.toFullScreenshot(id + '-2.png');

        const summaryImagePath = id + '-2.png';

        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 2 ? id + '2.png' : undefined
                })),
                summaryImagePath
            });
        }
    });

    


})