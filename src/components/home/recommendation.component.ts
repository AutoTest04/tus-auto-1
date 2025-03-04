import { BaseComponent, LocatorHost } from '@trident/e2e-common';
import { RecommendationCardComponent } from './recommendation-card.component';

export class RecommendationComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator(`trident-recommended-section`));
    }

    readonly shiftButton = (dir: 'left' | 'right') =>
        this.getByTestId(
            `recommended-${dir === 'left' ? 'shiftLeft' : 'shiftRight'}-btn`
        );

    readonly cards = (iconCls?: string) =>
        new RecommendationCardComponent(this.root, iconCls);

    readonly loadingCards = this.locator(`pbi-loading-card`);

    // recommendation
    async waitForCardLoaded(): Promise<void> {
        await this.root.waitFor();
        const count = await this.loadingCards.count();
        await Promise.all(
            Array.from({ length: count }, (_, i) =>
                this.loadingCards.nth(i).waitFor({ state: 'hidden' })
            )
        );
    }

    async getLearningMaterialTitles(): Promise<string[]> {
        await this.waitForCardLoaded();
        const titles = new Set<string>();
        for await (const _ of this.iterateCarousel()) {
            const learningMaterials = this.cards('pbi-glyph-flag');
            const count = await learningMaterials.root.count();
            for (let i = 0; i < count; i++) {
                const title = await learningMaterials.getCardTitle(i);
                titles.add(title || '');
            }
        }
        return [...titles];
    }

    async shiftCarousel(dir: 'left' | 'right'): Promise<boolean> {
        const $button = this.shiftButton(dir);
        if (
            (await $button.isVisible()) &&
            !(await $button.getAttribute('class'))?.includes('disabled')
        ) {
            await $button.click();
            return true;
        }
        return false;
    }

    async *iterateCarousel(): AsyncGenerator<void> {
        // shift to the leftmost
        while (await this.shiftCarousel('left')) {
            // noop
        }

        // shift to right step by step
        do {
            yield;
        } while (await this.shiftCarousel('right'));
    }
}
