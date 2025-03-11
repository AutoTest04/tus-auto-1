import { expect, TestBuilder, owner, FabricCapacityService } from '@trident/e2e-common';
import { WorkspacePage } from '../pages/workspace.page';

const { test } = TestBuilder.create()
.p('workspacePage', WorkspacePage)
.s('capacity', FabricCapacityService);;

test.describe('new workspace', () => {
    test('cascadelete relation --- should show hierarchy view for parent child artifacts @Official', async ({ workspacePage, capacity, page }) => {
        owner('hhh');
        await workspacePage.goToMyWorkspace();
        const workspace = await capacity.createFabricWorkspace();
        await page.reload(); // load the newly created workspace metadata by reloading the portal

        // create Lakehouse artifact
        const artifactLakehouseDisplayName = 'LakehouseTest';
        await workspacePage.createArtifact(
            workspace.objectId,
            'Lakehouse',
            undefined,
            artifactLakehouseDisplayName
        );
    });

})