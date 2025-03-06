import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class MessageBarComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-shell'));
        this.tridentMessageBarListItem = this.tridentMessageBarList.getByTestId('tri-message-bar-item');
        this.notificationBarInTridentSecondaryLink = this.notificationBarInTrident.getByTestId('notification-secondary-link');
        this.notificationBarInTridentAction = this.notificationBarInTrident.getByTestId('notification-action-btn');
        this.notificationBarInTridentDismiss = this.notificationBarInTrident.getByTestId('notification-action-dismiss-btn');

    }
    readonly notificationBarInTrident = this.getByTestId('tri-bar-notification-bar-in-trident');
    readonly notificationBarInTridentSecondaryLink;
    readonly notificationBarInTridentAction;
    readonly notificationBarInTridentDismiss;
    
    
    readonly tridentMessageBarList = this.getByTestId('tri-bar-trident-message-bar-list');
    readonly tridentMessageBarListItem;

}