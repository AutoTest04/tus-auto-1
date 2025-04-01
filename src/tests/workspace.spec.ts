import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../pages/workspace.page';
import { PlusNewPanelPage } from '../pages/plus-new-panel.page';


const logger = new Logger('workspace-view.tests');

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.p('plusNewPanelPage', PlusNewPanelPage)
.s('capacity', FabricCapacityService);;

test.describe('new workspace', () => {

    // test.beforeEach(async ({ workspacePage }) => {

    //     await workspacePage.goToMyWorkspace();
    //     const workspace = await workspacePage.createWorkspace();

    //     await workspacePage.gotoWorkspace(workspace.objectId);
    // });

    // test('Can click Import button @Official@Stable', async ({ workspacePage }) => {
    //     owner('yanzhang4');

    //     await expect(workspacePage.workspaceView.importButton).toBeVisible();
    // });

    // test('', async ({ workspacePage, page}) =>{
    //     owner('hh');
    //     await retry(async () => {
    //         if (!await workspacePage.settingsButton.isVisible()) {
    //             await workspacePage.workspaceView.moreMenuButton.click();
    //             logger.info(`workspace settings button is invisible, click the menu button`);
    //         }
    //        // a relative short timeout to fast retry
    //         await workspacePage.settingsButton.click({timeout: 2 * 1000});
    //     }, { times: 3 });

    //     await page.waitForTimeout(10000);
 
    //     await expect(workspacePage.workspaceSettingsPanel).toBeVisible();
    //     await expect(workspacePage.workspaceSettingsLeftNavPane).toBeVisible();
    // })

    test('create notebook', async ({ workspacePage, page, plusNewPanelPage}) => {
        owner('hhh');

        await workspacePage.gotoWorkspace('0cc34df9-0b6a-4d61-8764-280bf9c635f6');

        await workspacePage.openNewItemPanel()

        await plusNewPanelPage.ClickCard('notebook')

        await page.waitForTimeout(10000000000000000);
    });

})

