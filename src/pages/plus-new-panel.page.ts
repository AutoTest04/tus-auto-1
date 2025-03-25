//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

import { Locator, Page } from '@playwright/test';

import { BasePage } from '@trident/e2e-common';
import { CreateNewPanelComponent } from '../components/create-new-panel/create-new-panel.component';

export class PlusNewPanelPage extends BasePage {

    readonly createNewPanel = new CreateNewPanelComponent(this.page);

    public readonly allItemPivot = this.page.getByTestId('new-panel-all-items');
    public readonly favoritePivor = this.page.getByTestId('new-panel-favorite');

    public readonly closeBtn = this.page.getByTestId('tri-side-pane-close-button');

    public readonly plusNewBtn = this.page.getByTestId('plus-new-btn');
    public readonly plusNewPanelTitle = this.getByTestId('create-new-panel-title');

    public readonly sections = this.createNewPanel.locator(`tri-create-new-section`);
    public readonly sectionTitles = this.createNewPanel.locator(`.create-new-section-title`);
    public readonly cards = (sectionIndex: number) => this.sections.nth(sectionIndex).locator(`tri-create-new-card`);
    public readonly cardTitles = (sectionIndex: number) => this.sections.nth(sectionIndex).locator(`.create-new-card-title`);
    public readonly creationCard = this.createNewPanel.locator(`tri-create-new-card`);

    public readonly targetCreationCard = (cardIndex: number) => this.creationCard.nth(cardIndex);
    public readonly empty = this.createNewPanel.locator(`tri-empty-state`);
    public readonly homeOneDialog = this.locator('iframe[name="iframe-dialog-react-example"]');

    private readonly filterSearchBox = this.createNewPanel.locator('tri-search-box');

    constructor(public readonly page: Page) {
        super(page);
    }

    public async getPivotState(pivot: Locator): Promise<boolean> {
        await pivot.waitFor({ state: 'visible' });
        const ariaSelected = await pivot.getAttribute('aria-selected');
        return ariaSelected === 'true'; 
    }

    public async searchText(text: string): Promise<void> {
        await this.filterSearchBox.click();
        await this.filterSearchBox.locator('input').fill(text);
    }

    public async getCardName(card: Locator): Promise<string> {
        return await card.locator('div').first().getAttribute('aria-label') || '';
    }

    public getCardFavoriteBtn(card: Locator): Locator {
        return card.getByTestId('favorite-button');
    }

    public async waitForFilterApplied() {
        await this.page.waitForFunction(selector => {
                const cards = document.querySelectorAll(selector);
                return cards.length <= 2;
            },
            'tri-create-new-card', // Selector
            { timeout: 5000 }
        );
    }

    public async getSectionTitlesWithCardTitlesMap(): Promise<{ [sectionTitle: string]: string[] }> {
        // Object to hold the mapping of section titles to card titles
        const sectionToCardsMap: { [sectionTitle: string]: string[] } = {};
      
        const sectionCount = await this.sectionTitles.count();
        for (let i = 0; i < sectionCount; i++) {
          // Get the section title
          const sectionTitle = (await this.sectionTitles.nth(i).innerText()).trim();
      
          // Get the card titles for the current section
          const cardTitles = await this.cardTitles(i).allInnerTexts();
          const trimmedCardTitles = cardTitles.map(title => title.trim());
          sectionToCardsMap[sectionTitle] = trimmedCardTitles;
        }
        return sectionToCardsMap;
    }

    public async ClickCard(text: string): Promise<void> {
        // navigate to the all item pivot
        const plusNewAllItemPivot = this.allItemPivot;
        await plusNewAllItemPivot.click();
        
        // filter homeone creation card
        const filterValue = text;
        await this.searchText(filterValue);
        
        // Wait for the filtered results to update
        //await plusNewPanelPage.waitForFilterApplied();
        const artifactCardTitles = await this.creationCard.allInnerTexts();
        const artifactIndex = artifactCardTitles.indexOf(text);
        await this.targetCreationCard(artifactIndex).click();

    }

}
