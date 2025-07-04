import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../pages/workspace.page';
import { PlusNewPanelPage } from '../pages/plus-new-panel.page';
import { NotebookPage } from '../pages/notebook/notebook.page';
import { TestDocBuilder } from '../utils/test-doc-builder';
import * as path from 'path';
import * as fs from 'fs';


const logger = new Logger('workspace-view.tests');

const jsonPath = path.resolve(__dirname, '../utils/testdata.json');
const rawData = fs.readFileSync(jsonPath, 'utf-8');
const sampleData = JSON.parse(rawData);

const testCasePath = path.resolve(__dirname, '../utils/testcases.json');
const testCaseRaw = fs.readFileSync(testCasePath, 'utf-8');
const testCases = JSON.parse(testCaseRaw) as {
  id: string;
  title: string; 
  precondition?: string;
  steps: string[];
  result: string;
  imagePath?: string;
}[];

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
        await docbuilder.save("测试文档.docx");
        logger.info('Test document saved successfully.');
    });

    test('create lakehouse with GB18030 test', async ({ workspacePage, page}) => {
        owner('v-jiaqihou');

        const id = '3.10.1';
        workspacePage.triListFilter.setCaseId(id);

        const summaryImagePath = '2.png';
    
        await workspacePage.filterItemByName(docbuilder.getShort(0))
        await workspacePage.triListFilter.toFullScreenshot(summaryImagePath);
        await workspacePage.triListFilter.toHaveScreenshot('1.png');
        await workspacePage.triListFilter.compareWithSnapshot('1.png');

        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map((stepText, i) => ({
                    text: stepText,
                    imagePath: i === 2 ? '1.png' : undefined
                })),
                summaryImagePath
            });
        }

    });
    test('create lakehouse with GB18030 test2', async ({ workspacePage, page}) => {
        owner('v-jiaqihou');

        const id = '3.10.2';
        workspacePage.triListFilter.setCaseId(id);

        await workspacePage.filterItemByName('龭唉𫓧G㐁A𫟦01')

        await page.waitForTimeout(1000);

        await workspacePage.triListFilter.toHaveScreenshot('3.png');
        await workspacePage.triListFilter.compareWithSnapshot('3.png');
        await page.waitForTimeout(1000);

        const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map(stepText => ({ text: stepText }))
            });
        }

    });

    test('1', async ({ workspacePage, page}) => {
        owner('v-jiaqihou');

        const id = '3.10.2';
        workspacePage.triListFilter.setCaseId(id);

        await workspacePage.filterItemByName('龭唉𫓧G㐁A𫟦01')

        await page.waitForTimeout(1000);

        await workspacePage.triListFilter.toHaveScreenshot('3.png');
        await workspacePage.triListFilter.compareWithSnapshot('3.png');
        await page.waitForTimeout(1000);

                const tc = testCases.find(tc => tc.id === id);
        if (tc) {
            docbuilder.addTest({
                ...tc,
                steps: tc.steps.map(stepText => ({ text: stepText }))
            });
        }

    });


})