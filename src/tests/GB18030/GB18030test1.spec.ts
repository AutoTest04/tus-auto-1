import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../../pages/workspace.page';
import { ReportPage } from '../../pages/report.page';
import { ScorecardPage } from '../../pages/scorecard.page';
import { HomePage } from 'src/pages/home.page';
import { DataflowPage } from '../../pages/dataflow.page';
import { PlusNewPanelPage } from '../../pages/plus-new-panel.page';
import { TestDocBuilder } from '../../utils/test-doc-builder';
import { AdminPortalPage } from 'src/pages/admin-portal.page';
import { loadSampleData, loadTestCases } from '../../utils/testdata-loader';
import { testInputSamplesAndCapture } from '../../utils/test-helper';

const logger = new Logger('workspace-view.tests');

const sampleData = loadSampleData();
const testCases = loadTestCases();

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.p('homePage', HomePage)
.p('plusNewPanelPage', PlusNewPanelPage)
.s('capacity', FabricCapacityService)
.p('scorecardPage', ScorecardPage)
.p('reportPage', ReportPage)
.p('dataflowPage', DataflowPage)
.p('adminPortalPage', AdminPortalPage);

const docbuilder = new TestDocBuilder(sampleData);


test.describe.serial('GB18030', () => {

    test.beforeEach(async ({ workspacePage }) => {

        //await workspacePage.goToMyWorkspace();
        await workspacePage.gotoWorkspaceByID('b83a1bbb-02a6-4748-bb47-4aaae3b83215');
    });

    test.afterAll(async () => {
        await docbuilder.save("测试文档.docx");
        logger.info('Test document saved successfully.');
    });
    test('创建仪表板', async ({ adminPortalPage, workspacePage, page, homePage }) => {
        owner('v-jiaqihou');

        await homePage.openSettingsaPanel();
        await homePage.openAdminPortal()
        await page.waitForTimeout(5000);
        await adminPortalPage.openTagsTab();
        await adminPortalPage.tagsTab.clickNewButton();
        await testInputSamplesAndCapture(
            adminPortalPage.tagsInput,     // 输入框
            page,
            '3.1.1',
            true,                                  // 默认 shortSamples
            adminPortalPage.tagsInput           // 只截图这个组件
        );

    })
    
})