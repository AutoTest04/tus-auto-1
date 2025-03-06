//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

import { LocatorHost, BaseComponent } from '@trident/e2e-common';


export class HeaderComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator(`tri-header`));

        this.notificationButtonInMenu = parent.getByTestId('trident-notification-button-in-menu');
        this.badgeInMenu = this.notificationButtonInMenu.getByTestId('trident-notification-badge');
        this.processBarInMenu = this.notificationButtonInMenu.getByTestId('trident-notification-progress-bar');
    }

    readonly o365Launcher = this.getByTestId('o365-launcher');
    readonly globalSearchBar = this.locator('trident-global-search-bar input');
    readonly searchIcon = this.locator('trident-search-button button');
    readonly notificationButton = this.getByTestId('notification-button');
    readonly settingsButton = this.getByTestId('settings-button');
    readonly downloadButton = this.getByTestId('download-button');
    readonly helpButton = this.getByTestId('help-button');
    readonly feedbackButton = this.getByTestId('feedback-button');
    readonly moreActionsButton = this.getByTestId('more-actions-button');
    readonly userInfoButton = this.getByTestId('user-info-button');
    readonly defaultUserPhoto = this.userInfoButton.getByTestId('default-user-photo');
    readonly badgeInNotificationButton = this.notificationButton.getByTestId('trident-notification-badge');
    readonly processBarInNotificationButton = this.notificationButton.getByTestId('trident-notification-progress-bar');

    // In small screen header
    readonly badgeInMoreActionButton = this.moreActionsButton.getByTestId('trident-notification-badge');
    readonly processBarInMoreActionButton = this.moreActionsButton.getByTestId('trident-notification-progress-bar');

    // At <tri-menu> in small screen header
    readonly notificationButtonInMenu;
    readonly badgeInMenu;
    readonly processBarInMenu;

    private readonly requestUrls = {
        notifications: /.*\/metadata\/notifications\/summary.*/,
        appMetadata: /.*\/metadata\/app.*/,
        refreshUserMetadata: /.*\/powerbi\/metadata\/refreshusermetadata/,
        userPhoto: /.*\/powerbi\/resource\/userPhoto\/.*/,
        branding: /.*\/metadata\/bootstrap\/base/
    };
    private readonly backdrop = this.page.locator('div.cdk-overlay-backdrop');

    async isSearchIconVisible(): Promise<boolean> {
        await this.searchIcon.waitFor();
        return this.searchIcon.isVisible();
    }

    async isSearchBarVisible(): Promise<boolean> {
        await this.globalSearchBar.waitFor();
        return this.globalSearchBar.isVisible();
    }

    async openFullWidthSearchBar(via: 'click' | 'enterKey'): Promise<void> {
        await this.isSearchIconVisible();
        if (via === 'click') {
            await this.searchIcon.click();
        } else if (via === 'enterKey') {
            await this.searchIcon.focus();
            await this.page.keyboard.press('Enter');
        }
        await this.globalSearchBar.waitFor();
    }

    async focusOnSearchBar(): Promise<void> {
        await this.isSearchBarVisible();
        await this.globalSearchBar.focus();

        await this.backdrop.waitFor();
    }

    async waitForLoaded(pageNavigationPromise: Promise<void>) {
        // Start waiting for requests before goto. Note no await. (https://playwright.dev/docs/api/class-page#page-wait-for-response)
        // Since it may take time in sign-in, pass 0 to disable the timeout for test stability.
        const timeout = { timeout: 0 };
        const userPhotoPromise = this.page.waitForResponse(this.requestUrls.userPhoto, timeout);
        const notificationsPromise = this.page.waitForResponse(this.requestUrls.notifications, timeout);
        const appMetadataPromise = this.page.waitForResponse(this.requestUrls.appMetadata, timeout);
        const refreshUserMetadataPromise = this.page.waitForResponse(this.requestUrls.refreshUserMetadata, timeout);
        await pageNavigationPromise;
        await Promise.race([
            Promise.all([
                userPhotoPromise,
                notificationsPromise,
                Promise.race([
                    refreshUserMetadataPromise,
                    appMetadataPromise,
                ]),
            ]),
            new Promise(function(_resolve, reject){
                setTimeout(function() {
                    reject('Time out: Header is expected to be loaded within 30 seconds after navigation.');
                }, 30*1000);
            }),
        ]);
        await this.root.waitFor();

        // notifications are collected from multiple places and the actual number of them cannot be controlled.
        // We explicitly enforce the bages to display '2' notifications for test stability.
        await this.badgeInNotificationButton.evaluateAll(nodes => nodes.map(node => node.innerHTML = "2"));
    }
}
