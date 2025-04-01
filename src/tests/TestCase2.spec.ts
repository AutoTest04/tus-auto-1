import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry, WorkspaceService } from '@trident/e2e-common';
import { NotebookPage } from '../pages/notebook/notebook.page';

const { test } = TestBuilder.create()
.p('NotebookPage', NotebookPage)
.s('capacity', FabricCapacityService);;

test.describe(' data engineering experience in Microsoft Fabric.',() =>{

    // test.beforeEach(async ({ NotebookPage, page}) => {

    //     // await workspacePage.goToMyWorkspace();

    // });

    test('Creating a workspace and setting up its configuration',async({NotebookPage, page}) =>{
        owner('v-jiaqihou')

        await NotebookPage.gotoHome()

        await page.waitForTimeout(100000);
        
    })
})

 