import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class ExtensionPanelOutletComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.locator('tri-extension-panel-outlet'));
    }
}