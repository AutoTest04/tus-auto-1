import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../../pages/workspace.page';
import { ReportPage } from '../../pages/report.page';
import { PlusNewPanelPage } from '../../pages/plus-new-panel.page';
import { TestDocBuilder } from '../../utils/test-doc-builder';
import { loadSampleData, loadTestCases } from '../../utils/testdata-loader';

const logger = new Logger('workspace-view.tests');

const sampleData = loadSampleData();
const testCases = loadTestCases();

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.p('plusNewPanelPage', PlusNewPanelPage)
.s('capacity', FabricCapacityService)
.p('reportPage', ReportPage)

const docbuilder = new TestDocBuilder(sampleData);


test.describe.serial('GB18030', () => {

    test.beforeEach(async ({ workspacePage }) => {

        await workspacePage.goToMyWorkspace();
        await workspacePage.gotoWorkspaceByID('c9dedc89-0917-4882-aa7d-0d31bab9d165');
    });

    test.afterAll(async () => {
        await docbuilder.save("测试文档.docx");
        logger.info('Test document saved successfully.');
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

})