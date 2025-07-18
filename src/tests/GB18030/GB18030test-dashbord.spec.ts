import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../../pages/workspace.page';
import { ReportPage } from '../../pages/report.page';
import { DashboardPage } from '../../pages/dashboard.page';
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
.p('dashboardPage', DashboardPage)

const docbuilder = new TestDocBuilder(sampleData);


test.describe.serial('GB18030', () => {

    test.beforeEach(async ({ workspacePage }) => {

        await workspacePage.goToMyWorkspace();
        await workspacePage.gotoWorkspaceByID('33a0b877-2143-4d08-8537-aaa1343a0db3');
    });

    test.afterAll(async () => {
        await docbuilder.save("Dashbord测试文档.docx");
        logger.info('Test document saved successfully.');
    });

    test('创建仪表板', async ({ plusNewPanelPage, workspacePage, page, reportPage }) => {
        owner('v-jiaqihou');
        const id = '3.4.1';

        await workspacePage.openNewItemPanel()
        await plusNewPanelPage.ClickCard('Dashboard')
        await workspacePage.inputCardName(docbuilder.getShort(8))
        await workspacePage.itemcreation.toHaveScreenshot(id + '-1.png')
        await workspacePage.clickCardBtn();
        await workspacePage.filterItemByName(docbuilder.getShort(8))
        await workspacePage.itemcreation.toFullScreenshot(id + '-2.png')

        const summaryImagePath = id + '-2.png';
        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 4 ? id + '-1.png' : undefined
                })),
                summaryImagePath
            });
        }
        //await page.waitForTimeout(10000);
    })

    test('在 Power BI 服务中创建仪表板的副本文件', async ({ workspacePage, page, dashboardPage }) => {
        owner('v-jiaqihou');
        const id = '3.4.2';

        await workspacePage.filterItemByName(docbuilder.getShort(8))
        await workspacePage.triListFilter.toHaveScreenshot(id + '-1.png')
        await dashboardPage.saveCopy(docbuilder.getShort(3))

        await dashboardPage.dashboardContent.toFullScreenshot(id + '-2.png')


        await page.waitForTimeout(1000);
        //await reportPage.pickSMComponent.toFullScreenshot(id + '-1.png')

        const summaryImagePath = id + '-2.png';
        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 2 ? id + '-1.png' : undefined
                })),
                summaryImagePath
            });
        }
    })

    test('共享仪表板', async ({ workspacePage, dashboardPage }) => {
        owner('v-jiaqihou');
        const id = '3.1.3';

        await workspacePage.filterItemByName(docbuilder.getShort(8))
        await workspacePage.triListFilter.toHaveScreenshot(id + '-1.png')
        await workspacePage.clickItemByName(docbuilder.getShort(0))

        await dashboardPage.share('v-jiaqihou')

        await dashboardPage.dashboardContent.toFullScreenshot(id + '-2.png')

        const summaryImagePath = id + '-2.png';
        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 2 ? id + '-1.png' : undefined
                })),
                summaryImagePath
            });
        }
    })
    test('添加仪表板注释', async ({ workspacePage, dashboardPage }) => {
        owner('v-jiaqihou');
        const id = '3.1.4';

        await workspacePage.filterItemByName(docbuilder.getShort(8))
        await workspacePage.triListFilter.toHaveScreenshot(id + '-1.png')
        await workspacePage.clickItemByName(docbuilder.getShort(0))

        await dashboardPage.Comment(docbuilder.getShort(8));

        await dashboardPage.dashboardContent.toFullScreenshot(id + '-2.png')

        const summaryImagePath = id + '-2.png';
        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 2 ? id + '-1.png' : undefined
                })),
                summaryImagePath
            });
        }
    })

    test('删除报表', async ({ workspacePage, page }) => {
        owner('v-jiaqihou');
        const id = '3.1.5';

        await workspacePage.deleteReport(docbuilder.getShort(0));
        await workspacePage.triListFilter.toHaveScreenshot(id + '-1.png')
        await workspacePage.triListFilter.toFullScreenshot(id + '-2.png')


        await page.waitForTimeout(1000);

        const summaryImagePath = id + '-2.png';
        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 2 ? id + '-1.png' : undefined
                })),
                summaryImagePath
            });
        }
    })
})