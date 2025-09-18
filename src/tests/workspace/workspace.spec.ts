import { expect, TestBuilder, Logger, owner, FabricCapacityService, retry } from '@trident/e2e-common';
import { WorkspacePage } from '../../pages/workspace.page';
import { PlusNewPanelPage } from '../../pages/plus-new-panel.page';


const logger = new Logger('workspace-view.tests');

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.p('plusNewPanelPage', PlusNewPanelPage)
.s('capacity', FabricCapacityService);;

test.describe('P0', () => {

    test.beforeEach(async ({ workspacePage }) => {

        await workspacePage.goToMyWorkspace();
        const workspace = await workspacePage.createWorkspace();

        await workspacePage.gotoWorkspace(workspace.objectId);
    });

    test('Should show NewItem Panel', async ({ workspacePage }) => {
        owner('v-jiaqihou');

        await workspacePage.openNewItemPanel()

        await expect(workspacePage.plusNewMenu).toBeVisible();
    });

    test('open setting panel', async ({ workspacePage, page}) =>{
        owner('v-jiaqihou');
        await retry(async () => {
            if (!await workspacePage.settingsButton.isVisible()) {
                await workspacePage.workspaceView.moreMenuButton.click();
                logger.info(`workspace settings button is invisible, click the menu button`);
            }
           // a relative short timeout to fast retry
            await workspacePage.settingsButton.click({timeout: 2 * 1000});
        }, { times: 3 });

        await page.waitForTimeout(10000);
 
        await expect(workspacePage.workspaceSettingsPanel).toBeVisible();
        await expect(workspacePage.workspaceSettingsLeftNavPane).toBeVisible();

    });

    test('create notebook', async ({ workspacePage, page, plusNewPanelPage}) => {
        owner('v-jiaqihou');

        await workspacePage.openNewItemPanel()

        await plusNewPanelPage.ClickCard('notebook')

        await expect(workspacePage.workspaceSettingsPanel).toBeVisible();

        await page.waitForTimeout(10000);

    });

    test('open setting panel', async ({ workspacePage, page}) =>{
        owner('v-jiaqihou');
        await retry(async () => {
            if (!await workspacePage.settingsButton.isVisible()) {
                await workspacePage.workspaceView.moreMenuButton.click();
                logger.info(`workspace settings button is invisible, click the menu button`);
            }
           // a relative short timeout to fast retry
            await workspacePage.settingsButton.click({timeout: 2 * 1000});
        }, { times: 3 });

        await page.waitForTimeout(10000);
 
        await expect(workspacePage.workspaceSettingsPanel).toBeVisible();
        await expect(workspacePage.workspaceSettingsLeftNavPane).toBeVisible();

})

    test('Should navigate to selected workspace when click workspace button @Official', async ({ workspacePage }) => {
        owner('yuwwang');

        const workspaceName = workspace.displayName;
        await workspacePage.workspaceFlyout.searchBar.fill(workspaceName);
        await Promise.all([
            workspacePage.workspaceFlyout.navigateSampleWorkspace(workspaceName).click(),
            // navigate to workspace page
            workspacePage.workspaceFlyout.page.waitForURL(/.*groups\/[a-z|0-9|-]{36}\/list\?.*/)
        ]);

        // wait for workspace view is loaded
        await workspacePage.workspaceView.root.waitFor();

        // open the correct workspace
        const openedWorkspace = await workspacePage.workspaceView.workspaceHeaderText.innerText();
        expect(openedWorkspace).toBe(workspaceName);
    });

    test('Can pin and unpin workspace @Official', async ({ workspacePage }) => {
        owner('yuwwang');

        const workspaceName = workspace.displayName;
        await expect(workspacePage.workspaceFlyout.allLabel).toBeVisible();

        // click to pin workspace
        await workspacePage.workspaceFlyout.searchBar.fill(workspaceName);
        await expect(workspacePage.workspaceFlyout.navigateSampleWorkspace(workspaceName)).toBeVisible();
        logger.info(`${workspaceName} is visible on workspace flyout`);
    
        await workspacePage.workspaceFlyout.workspaceToPinIcon(workspaceName).click();

        // pin successfully
        await expect(workspacePage.workspaceFlyout.workspacePinned(workspaceName)).toBeVisible();

        // click to Unpin workspace
        await workspacePage.workspaceFlyout.workspaceToUnpinIcon(workspaceName).click();

        // unpin successfully
        await expect(workspacePage.workspaceFlyout.workspacePinned(workspaceName)).not.toBeVisible();
        await expect(workspacePage.workspaceFlyout.workspaceNotPinned(workspaceName)).toBeVisible();
    });

});