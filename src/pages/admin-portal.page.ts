import { PageCommon } from './page.common';
import { TagsTab } from 'src/components/admin-portal/tags.component';

export class AdminPortalPage extends PageCommon {
    readonly tagsTab = new TagsTab(this.page);
    readonly tagsTabButton = this.getByTestId('tags-title-container');
    readonly tagsInput = this.getByTestId('tags-info-form-name-input');
    readonly tagsSaveButton = this.getByTestId('tags-create-form-apply');

    readonly domainsTab = new TagsTab(this.page);
    readonly domainsTabButton = this.getByTestId('domains-title-label');
    readonly domainsNameHeader = this.getByTestId('domains-table-header-name');
    readonly domainNewButton = this.getByTestId('domains-menu-button-Create new domain');



    async openTagsTab() {
        await this.tagsTabButton.click();
    }

    async fillTag(name : string = '测试标签') {
        await this.tagsInput.click();
        await this.tagsInput.fill(name);
    }
    async saveTag() {
        await this.tagsSaveButton.click();
    }
    async newTag(name : string = '测试标签') {
        await this.tagsTab.clickNewButton();
        await this.fillTag(name);
        //await this.saveTag();
    }


}