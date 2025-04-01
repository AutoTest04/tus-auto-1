import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry, WorkspaceService } from '@trident/e2e-common';
import { WorkspacePage } from '../pages/workspace.page';

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.s('capacity', FabricCapacityService);;

test.describe(' data engineering experience in Microsoft Fabric.',() =>{

    test.beforeEach(async ({ workspacePage,page}) => {

        // await workspacePage.goToMyWorkspace();
        // const workspace = await workspacePage.createWorkspace();
        await page.setViewportSize({ width: 1920, height: 1080 });
        await workspacePage.gotoWorkspace('0cc34df9-0b6a-4d61-8764-280bf9c635f6');
    });

    test('Creating a workspace and setting up its configuration',async({workspacePage,page}) =>{
        owner('v-ddang@microsoft.com')
        await workspacePage.goToWorkspaceSettings(undefined,'License info');
        await workspacePage.EditButton.click()
        await workspacePage.licensemode.click()
        await page.waitForTimeout(100000);
        
    })
})

 