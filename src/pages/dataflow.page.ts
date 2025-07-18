import { PageCommon } from './page.common';

export class DataflowPage extends PageCommon {


    readonly createPanel = this.frameLocator("[name='dataflowModelAuthoringFrame']");

    readonly addTableButton = this.createPanel.locator('button').filter({ hasText: ' Add new tables ' });


    async gotoHome(user?: string, globalSkipToMainContent?: number): Promise<void> {
        await this.goto('/', { featureSwitches: { globalSkipToMainContent: globalSkipToMainContent || 0 }, userCredential: user });
    }

    async createbyaddTable(): Promise<void> {
        const gen1button = this.page.locator('button', { hasText: 'No, create a Dataflow Gen1' });

        try {
            await gen1button.waitFor({ state: 'visible', timeout: 3000 });
            await gen1button.click();
        } catch (e) {
            console.log('Gen1 button not visible within timeout, skipping...');
        }

        await this.addTableButton.click();
}
}