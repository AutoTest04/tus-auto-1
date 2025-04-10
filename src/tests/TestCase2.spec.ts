import { expect, TestBuilder, owner, FabricCapacityService } from '@trident/e2e-common';
import { NotebookPage } from '../pages/notebook/notebook.page';
import { WorkspacePage } from '../pages/workspace.page';
import { PlusNewPanelPage } from '../pages/plus-new-panel.page';

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.p('NotebookPage', NotebookPage)
.p('plusNewPanelPage', PlusNewPanelPage)
.s('capacity', FabricCapacityService);;

test.describe(' Typical user scenario test in Microsoft Fabric.',() =>{

    test('setting up test configuration',async({ workspacePage, NotebookPage, page}) =>{
        owner('v-jiaqihou')

        await NotebookPage.gotoHome()
        await NotebookPage.gotoWorkspace('TUStest')

        await expect(workspacePage.workspaceView.importButton).toBeVisible()
        await workspacePage.importNotebook()

        await workspacePage.filterItemByName('Data science scenario')
        await workspacePage.clickItemByName('Data science scenario')

        await NotebookPage.runAllCell()

        await page.waitForTimeout(25000)

        await NotebookPage.backToWorkspace()
        await page.waitForTimeout(25000)
        
    })
})

 