import { PageCommon } from './page.common';
import { DashboardContentComponent } from '../components/dashboard/dashboard-content.component';
import { DuplicateCard } from '../components/dashboard/duplicateCard.component';
import { shareDashboardComponent } from '../components/dashboard/share-dashboard.component';
import { CommentsDashboardComponent } from '../components/dashboard/comments-dashboard.component';

export class DashboardPage extends PageCommon {
    public readonly dashboardContent = new DashboardContentComponent(this.page);
    public readonly duplicateCard = new DuplicateCard(this.page);
    public readonly shareDashboard = new shareDashboardComponent(this.page);
    public readonly commentsDashboardComponent = new CommentsDashboardComponent(this.page);

    readonly file_list_save = this.getByTestId('save-a-copy-btn');

    async saveCopy( name?: string) {
        await this.dashboardContent.fileButton.click();
        await this.file_list_save.click();
        if (name) {
            await this.duplicateCard.inputName.fill(name);
        }
        await this.duplicateCard.duplicateButton.click();
    }

    async share( email: string) {
        await this.dashboardContent.shareButton.click();
        await this.shareDashboard.emailInput.fill(email);
    }

    async Comment(comment: string) {
        await this.dashboardContent.commentButton.click();
        await this.commentsDashboardComponent.commentInput.click();
        await this.commentsDashboardComponent.commentInput.fill(comment);
        await this.commentsDashboardComponent.postButton.click();
    }
}