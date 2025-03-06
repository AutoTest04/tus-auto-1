import { Locator } from '@playwright/test';
import { BaseComponent, LocatorHost } from '@trident/e2e-common';

export class RecommendationCardComponent extends BaseComponent {
    constructor(parent: LocatorHost, iconCls?: string) {
        super(
            parent.locator(
                `recommended-content-card${
                    iconCls ? `:has(pbi-icon i.${iconCls})` : ''
                }`
            )
        );
    }

    readonly cardTitle: Locator = this.locator(`pbi-card-title`);

    async getCardTitle(index: number): Promise<string> {
        return (await this.cardTitle.nth(index).textContent()) ?? '';
    }
}
