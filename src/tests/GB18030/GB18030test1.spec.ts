import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../../pages/workspace.page';
import { ReportPage } from '../../pages/report.page';
import { ScorecardPage } from '../../pages/scorecard.page';
import { DataflowPage } from '../../pages/dataflow.page';
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
.p('scorecardPage', ScorecardPage)
.p('reportPage', ReportPage)
.p('dataflowPage', DataflowPage)

const docbuilder = new TestDocBuilder(sampleData);


test.describe.serial('GB18030', () => {

    test.beforeEach(async ({ workspacePage }) => {

        await workspacePage.goToMyWorkspace();
        await workspacePage.gotoWorkspaceByID('406b8379-c5e2-42bb-aaec-91ea41790600');
    });

    test.afterAll(async () => {
        await docbuilder.save("测试文档.docx");
        logger.info('Test document saved successfully.');
    });
    test('创建仪表板', async ({ plusNewPanelPage, workspacePage, page, dataflowPage }) => {
        owner('v-jiaqihou');

        await workspacePage.openNewItemPanel()
        await plusNewPanelPage.ClickCard('Dataflow Gen1')
        await page.waitForTimeout(10000);
        await dataflowPage.createbyaddTable();
        await page.waitForTimeout(5000);


    })
    
})