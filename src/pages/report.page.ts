import { GotoOptions } from '@trident/e2e-common';

import { ReportContentComponent } from '../components/report/report-content.component';
import { SaveReportComponent } from '../components/report/save-report.component';
import { ShareReportComponent } from '../components/report/share-report.component';
import { CommentsReportComponent } from '../components/report/comments-report.component';
import { PickSMComponent } from '../components/report/pick-SM.components';
import { PageCommon } from './page.common';

export class ReportPage extends PageCommon {
    public readonly savedPage1Button = this.page.getByTestId('pages-navigation-list-items')
                                                .filter( { hasText: /page 1/i } );
    public readonly reportContent = new ReportContentComponent(this.page);
    public readonly saveReportPage = new SaveReportComponent(this.page);
    public readonly shareReportPage = new ShareReportComponent(this.page);
    public readonly pickSMComponent = new PickSMComponent(this.page);

    public readonly commentsReportComponent = new CommentsReportComponent(this.page);
    public readonly Report_Edit= this.page.getByTestId('appbar-edit-menu-btn');

    private readonly createMenuItem = this.page.getByTestId('navbarItem create');
    private readonly createReportCard = this.page
                            .getByTestId('tri-create-new-card')
                            .getByText('Report', { exact: true });
    private readonly usePublishedDataSet = this.page
                            .getByTestId('quick-create-card')
                            .getByText(/published/i);
    private readonly firstPublishedDataset = this.page
                            .getByTestId('datahub-list-table-row')
                            .nth(0);                      
    private readonly triSplitMenuButton = this.page
                            .getByTestId('tri-split-menu-btn');
    private readonly generateBlankMenuItem = this.page
                            .getByTestId('tri-split-menu-item')
                            .getByText(/blank/i);
    private readonly newPageButton = this.page
                                        .getByTestId('carousel-newpage-btn');

    private readonly myWorkspaceIcon = this.page.getByTestId('navbar-label-item-my-workspace');
    private readonly myWorkspaceFilter = this.page.getByTestId('tri-workspace-list-view-filter')
                                                .getByTestId('tri-search-box');
    private readonly workspaceRow = this.page.getByTestId('workspace-list-content-view-row');

    async gotoHome(user?: string, globalSkipToMainContent?: number): Promise<void> {
        await this.goto('/', { featureSwitches: { globalSkipToMainContent: globalSkipToMainContent || 0 }, userCredential: user});
    }

    public async createNewPage(): Promise<void> {
        await this.newPageButton.click();
    }


    public async searchData(text: string): Promise<void> {
        await this.reportContent.searchBox.click();
        await this.reportContent.searchBox.fill(text);
    }

    public async shareReport(email: string, message: string): Promise<void> {
        await this.reportContent.shareButton.click();
        await this.shareReportPage.emailsInput.click();
        await this.shareReportPage.emailsInput.fill(email);
        await this.shareReportPage.messageInput.click();
        await this.shareReportPage.messageInput.fill(message);
    }
    public async commentReport(comment: string): Promise<void> {
        await this.reportContent.commentButton.click();
        await this.commentsReportComponent.commentInput.click();
        await this.commentsReportComponent.commentInput.fill(comment);
        await this.commentsReportComponent.postButton.click();
    }

    public async createReportbySM(reportName: string): Promise<void> {
        await this.pickSMComponent.firstPublishedDataset.click();
        await this.triSplitMenuButton.click();
        await this.generateBlankMenuItem.click();
        await this.saveReport(reportName);
    }

    public async clickUsePublishedDataSet(): Promise<void> {
        await this.usePublishedDataSet.click();
    }

    public async searchSM(SMname: string): Promise<void> {
        await this.clickUsePublishedDataSet();
        await this.pickSMComponent.filterSearchBox.click();
        await this.pickSMComponent.filterSearchBox.locator('input').fill(SMname);
    }

    public async createTwoPageReport(reportName: string): Promise<void> {
        await this.launch();
        await this.getFirstDataset();
        await this.autogenerate();
        await this.createNewPage();
        await this.saveReport(reportName);
    }

    public async openReport(): Promise<void> {
        const reportLink = this.workspaceRow.first().getByTestId('item-name');
        await reportLink.click();
        await this.page.waitForLoadState();
        await this.savedPage1Button.waitFor();
    }

    public async reportExists(reportName: string): Promise<boolean> {
        await this.myWorkspaceIcon.click();
        await this.myWorkspaceFilter.waitFor();
        await this.myWorkspaceFilter.fill(reportName);
        const rows = await this.workspaceRow.count();

        return rows === 0? false: true;
    }

    public async loadReport(id: string, groupId?: string, user?: string, options?: Partial<GotoOptions>): Promise<void> {
        await this.gotoReport(id, groupId, user, options);
    }

    async gotoReport(reportId: string, groupId?: string, user?: string, options?: Partial<GotoOptions>): Promise<void> {
        const allOptions = user || options ? {
            ...(user ? { userCredential: user } : {}),
            ...(options ? options : {})
        } : undefined;
        const url = groupId ? `/groups/${groupId}/reports/${reportId}/ReportSection/` : `/groups/me/reports/${reportId}/ReportSection/`;

        await this.goto(url, allOptions);
    }

    public async waitForLoadState(state?: 'load' | 'domcontentloaded'): Promise<void> {
        await this.page.waitForLoadState(state);
    }

    private async launch(): Promise<void> {
        await this.createMenuItem.waitFor();
        await this.createMenuItem.click();
        await this.createReportCard.waitFor();
        await this.createReportCard.click();
    }

    private async getFirstDataset(): Promise<void> {
        await this.usePublishedDataSet.waitFor();
        await this.usePublishedDataSet.click();
        await this.firstPublishedDataset.waitFor();
        await this.firstPublishedDataset.click();
    }

    private async autogenerate(): Promise<void> {
        await this.triSplitMenuButton.click();
        await this.generateBlankMenuItem.waitFor();
        await this.generateBlankMenuItem.click();
        await this.newPageButton.waitFor();
    }

    private async saveReport(reportName: string): Promise<void> {
        //await this.fileMenu.waitFor();
        //await this.fileMenu.click();
        await this.reportContent.saveReportButton.waitFor();
        await this.reportContent.saveReportButton.click();
        await this.saveReportPage.reportNameInput.waitFor();
        await this.saveReportPage.reportNameInput.fill(reportName);
        await this.saveReportPage.confirmButton.click();
        await this.page.waitForLoadState();
        await this.Report_Edit.waitFor();
    }
}
