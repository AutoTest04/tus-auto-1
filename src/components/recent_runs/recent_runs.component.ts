import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class RecentRunsComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator(`trident-recent-runs`));
    }

    readonly title = this.getByTestId(`recent-run-title`);
    readonly tableList = this.getByTestId(`recent-run-table-list`);
    readonly closeButton = this.getByTestId(`recent-run-close-button`);
    readonly navigationButton = this.getByTestId('navigation-button');
    readonly historyRows = this.tableList.getByRole('row');

    async setup(): Promise<void> {
        await this.root.waitFor();
    }
}