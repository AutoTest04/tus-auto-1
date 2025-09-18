import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../../pages/workspace.page';
import { ReportPage } from '../../pages/report.page';
import { PlusNewPanelPage } from '../../pages/plus-new-panel.page';
import { TestDocBuilder } from '../../utils/test-doc-builder';
import { loadSampleData, loadTestCases } from '../../utils/testdata-loader';
import { testInputSamplesSplitAndCapture } from '../../utils/test-helper';


const logger = new Logger('workspace-view.tests');

const sampleData = loadSampleData();
const testCases = loadTestCases();

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.p('plusNewPanelPage', PlusNewPanelPage)
.s('capacity', FabricCapacityService)
.p('reportPage', ReportPage)

const docbuilder = new TestDocBuilder(sampleData);
7

test.describe.serial('GB18030', () => {

    test.beforeEach(async ({ workspacePage }) => {

        await workspacePage.goToMyWorkspace();
        await workspacePage.gotoWorkspaceByID('399b2030-6cfc-458f-85c1-413f331b25ae');
    });

    test.afterAll(async () => {
        //await docbuilder.save("Report测试文档.docx");
        logger.info('Test document saved successfully.');
    });

    test('创建报表', async ({ plusNewPanelPage, workspacePage, page, reportPage }) => {
        owner('v-jiaqihou');
        const id = '3.1.1';

        await workspacePage.openNewItemPanel()

        await plusNewPanelPage.ClickCard('Report')
        await reportPage.searchSM(docbuilder.getShort(1))
        await testInputSamplesSplitAndCapture(
            reportPage.pickSMComponent.filterSearchBox.locator('input'),     
            page,
            '3.1.1',
            true,                                  
            reportPage.pickSMComponent.root          
        );
        await page.waitForTimeout(1000);
        await reportPage.searchSM(docbuilder.getShort(2))
        await reportPage.createReportbySM(docbuilder.getShort(10))
        await workspacePage.backToWorkspace()
        await workspacePage.filterItemByName(docbuilder.getShort(10))

    })

    test('搜索报表中的字段', async ({ workspacePage, page, reportPage }) => {
        owner('v-jiaqihou');
        const id = '3.1.2';

        await workspacePage.filterItemByName(docbuilder.getShort(10))
        await workspacePage.triListFilter.toHaveScreenshot(id + '-1.png')
        await workspacePage.clickItemByName(docbuilder.getShort(0))
        await page.waitForTimeout(3000);

        await reportPage.searchData(docbuilder.getShort(10))
                await testInputSamplesSplitAndCapture(
            reportPage.reportContent.searchBox,     
            page,
            '3.1.2',
            false,                                  
            reportPage.reportContent.searchBox          
        );
        await reportPage.reportContent.toFullScreenshot(id + '-2.png')


        await page.waitForTimeout(1000);
        //await reportPage.pickSMComponent.toFullScreenshot(id + '-1.png')
    })

    test('分享报表', async ({ workspacePage, page, reportPage }) => {
        owner('v-jiaqihou');
        const id = '3.1.3';

        await workspacePage.filterItemByName(docbuilder.getShort(10))
        await workspacePage.triListFilter.toHaveScreenshot(id + '-1.png')
        await workspacePage.clickItemByName(docbuilder.getShort(0))

        await reportPage.shareReport('v-jiaqihou@microsoft.com',docbuilder.getShort(3));
        await reportPage.shareReportPage.toFullScreenshot(id + '-2.png')


        await page.waitForTimeout(1000);
        //await reportPage.pickSMComponent.toFullScreenshot(id + '-1.png')
    })
    test('添加报表评论', async ({ workspacePage, page, reportPage }) => {
        owner('v-jiaqihou');
        const id = '3.1.4';

        await workspacePage.filterItemByName(docbuilder.getShort(10))
        await workspacePage.triListFilter.toHaveScreenshot(id + '-1.png')
        await workspacePage.clickItemByName(docbuilder.getShort(0))

        await reportPage.commentReport(docbuilder.getShort(4));
        await reportPage.commentsReportComponent.toFullScreenshot(id + '-2.png')


        await page.waitForTimeout(10000);
        //await reportPage.pickSMComponent.toFullScreenshot(id + '-1.png')
    })

    test('删除报表', async ({ workspacePage, page }) => {
        owner('v-jiaqihou');
        const id = '3.1.5';

        await workspacePage.deleteReport(docbuilder.getShort(0));
        await workspacePage.triListFilter.toHaveScreenshot(id + '-1.png')
        await workspacePage.triListFilter.toFullScreenshot(id + '-2.png')


        await page.waitForTimeout(1000);

    })
})