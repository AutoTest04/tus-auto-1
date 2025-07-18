import { PageCommon } from './page.common';
import { ScorecardContentComponent } from '../components/scorecard/scorecard-content.component';
export class ScorecardPage extends PageCommon {
    public readonly scorecardContent = new ScorecardContentComponent(this.page);

    readonly newGoalBtn = this.locator('button').getByText('New goal')

    async share( email: string) {
        await this.scorecardContent.shareButton.click();
    }

    async inputGoalName(name: string) {
        await this.scorecardContent.goalnameinput.click();
        await this.scorecardContent.goalnameinput.fill(name);
    }

    async clickGoalSaveBtn() {
        await this.scorecardContent.saveButton.click();
    }

    async renameScorecard(name: string) {
        await this.scorecardContent.textLable.hover();
        await this.scorecardContent.editTitleIcon.click();
        await this.scorecardContent.titleLable.locator('input').fill(name);
    }

    async newGoal() {
        await this.scorecardContent.newButton.click();
        await this.newGoalBtn.click();
    }

    async filterGoal(name: string) {
        await this.scorecardContent.filter.click();
        await this.scorecardContent.filter.locator('input').fill(name);
    }

}