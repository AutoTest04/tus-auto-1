import { LocatorHost } from '@trident/e2e-common';
import { ComponentCommon } from '../component.common';
export class CommentsReportComponent extends ComponentCommon {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('comments-container'));

    }
    readonly commentInput = this.locator('div.textarea[role="textbox"][contenteditable="true"][aria-placeholder="Enter your comments here, and @mention people to grab their attention."]');
    readonly postButton = this.locator('button', { hasText: 'Post' });

}