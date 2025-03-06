import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class NotificationComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-header'));
        this.triShell = parent.locator('tri-shell');

        /**
         * Notification API playground related component.
         * First need to get an iframe.
         */
        const iframe = this.triShell.frameLocator('[name=iframe-page-react-example]');
        this.openNotificationButton = iframe.getByTestId('trident-notification-open-button');
        this.closeNotificationButton = iframe.getByTestId('trident-notification-close-button');
        this.inputTitle = iframe.getByTestId('trident-notification-input-title');
        this.inputMessage = iframe.getByTestId('trident-notification-input-message');
        this.inputDuration = iframe.getByTestId('trident-notification-input-duration');
        this.inputMessage = iframe.getByTestId('trident-notification-input-message');
        this.inputDuration = iframe.getByTestId('trident-notification-input-duration');
        this.inputNotificationType = iframe.getByTestId('trident-notification-input-notification-type');
        this.inputNotificationId = iframe.getByTestId('trident-notification-input-notification-id');
        this.inputCopySwitch = iframe.getByTestId('trident-notification-input-copy-switch');
        this.inputExtensionName = iframe.getByTestId('trident-notification-input-extension-name');
        this.inputActionName = iframe.getByTestId('trident-notification-input-action-name');
        this.inputButtonLabel = iframe.getByTestId('trident-notification-input-button-label');
        this.inputButtonType = iframe.getByTestId('trident-notification-input-button-type');
        this.inputItemType = iframe.getByTestId('trident-notification-input-item-type');
        this.notificationId = iframe.getByTestId('trident-notification-notification-id');

        // Notification toast related component
        this.notificationToast = parent.getByTestId('trident-notification-toast');
        this.notificationToastTitle = this.notificationToast.getByTestId('toast-title');
        this.notificationToastMessage = this.notificationToast.getByTestId('toast-message');
        this.notificationToastAction = this.notificationToast.getByTestId('toast-action');

        // Notification center related component
        this.pane = parent.getByTestId('trident-notification-center');
        this.paneCloseButton = this.pane.locator('tri-side-pane').getByTestId('tri-side-pane-close-button');
        this.paneContent = this.page.getByTestId('center-pane-content');
        this.clearAllButton = this.pane.getByTestId('clear-all');
        this.emptyState = this.pane.getByTestId('center-empty-state');
        this.dividerNew = this.pane.getByTestId('divider-new');
        this.dividerEarlier = this.pane.getByTestId('divider-earlier');
        this.cardList = this.pane.getByTestId('center-card-list');
        this.card = this.pane.getByTestId('center-card');
        this.cardTitle = this.pane.getByTestId('center-card-title');
        this.cardMessage = this.pane.getByTestId('center-card-message');
        this.clearAllDialogClearButton = parent.getByTestId("trident-dialog").getByTestId("tri-button").filter({ hasText: 'Clear' });
        this.clearAllDialogCloseIcon = parent.getByTestId("trident-dialog").getByTestId("close-icon");
        this.toolTips = parent.getByTestId('tri-tooltip-content');
        this.loadingPage = this.page.getByTestId('center-loading-page');
    }

    readonly triShell;

    readonly openNotificationButton;
    readonly closeNotificationButton;
    readonly inputTitle;
    readonly inputMessage;
    readonly inputDuration;
    readonly inputNotificationType;
    readonly inputNotificationId;
    readonly inputCopySwitch;
    readonly inputExtensionName;
    readonly inputActionName;
    readonly inputButtonLabel;
    readonly inputButtonType;
    readonly inputItemType;
    readonly notificationId;

    readonly notificationToast;
    readonly notificationToastTitle;
    readonly notificationToastMessage;
    readonly notificationToastAction;

    readonly pane;
    readonly paneCloseButton;
    readonly paneContent;
    readonly cardList;
    readonly card;
    readonly cardTitle;
    readonly cardMessage;
    readonly dividerNew;
    readonly dividerEarlier;
    readonly clearAllButton;
    readonly clearAllDialogClearButton;
    readonly clearAllDialogCloseIcon;
    readonly emptyState;
    readonly toolTips;
    readonly loadingPage;
}