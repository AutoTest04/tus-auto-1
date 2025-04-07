import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry, WorkspaceService } from '@trident/e2e-common';
import { NotebookPage } from '../pages/notebook/notebook.page';
import { WorkspacePage } from '../pages/workspace.page';
import { PlusNewPanelPage } from '../pages/plus-new-panel.page';

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.p('NotebookPage', NotebookPage)
.p('plusNewPanelPage', PlusNewPanelPage)
.s('capacity', FabricCapacityService);;

test.describe(' data engineering experience in Microsoft Fabric.',() =>{

    // test.beforeEach(async ({ NotebookPage, page}) => {

    //     // await workspacePage.goToMyWorkspace();

    // });

    test('setting up its configuration',async({ workspacePage, NotebookPage, page}) =>{
        owner('v-jiaqihou')

        await NotebookPage.gotoHome()
        await NotebookPage.gotoWorkspace('TUStest')

        await expect(workspacePage.workspaceView.importButton).toBeVisible()
        await workspacePage.importNotebook()

        await workspacePage.filterItemByName('Data science scenario')
        await workspacePage.clickItemByName('Data science scenario')

        await page.waitForTimeout(20000)

        await NotebookPage.runAllCell()

        await page.waitForTimeout(50000)
        
    })
})

 