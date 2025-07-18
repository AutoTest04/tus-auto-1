import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class EmailListComponent extends BaseComponent {
    constructor(parent: LocatorHost, isModern: boolean = false) {
        let locator = parent.getByTestId('email-list');
        if (isModern) {
            locator = parent.locator('emails-list-modern');
        }
        super(locator);
    }

    readonly emailListInput = this.getByTestId('emails-list-input');
    readonly firstEmailListInput = this.emailListInput.first();

    readonly topSuggestion = this.page.getByRole('option').nth(0);

    async addUser(input: string) {
        await this.emailListInput.waitFor();
        await this.emailListInput.fill(input);
        await this.topSuggestion.click();
    }
    
    async addUserToFirstEmailInput(input: string) {
        await this.firstEmailListInput.waitFor();
        await this.firstEmailListInput.fill(input);
        await this.topSuggestion.click();
    }
}