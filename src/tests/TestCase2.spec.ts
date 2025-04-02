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

    test('Creating a workspace and setting up its configuration',async({ workspacePage, NotebookPage, page, plusNewPanelPage}) =>{
        owner('v-jiaqihou')

        await NotebookPage.gotoHome()
        await NotebookPage.gotoWorkspace('TUStest')

        //await workspacePage.openNewItemPanel()
        //await plusNewPanelPage.ClickCard('notebook')

        await expect(workspacePage.workspaceView.importButton).toBeVisible();
        await workspacePage.importNotebook()

        await page.waitForTimeout(10000)
        
    })
})

 