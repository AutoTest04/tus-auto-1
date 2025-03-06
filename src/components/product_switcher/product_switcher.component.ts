import { LocatorHost, BaseComponent } from '@trident/e2e-common';

export class ProductSwitcherComponent extends BaseComponent {
    constructor(parent: LocatorHost) {
        super(parent.getByTestId('tri-product-switcher'));
    }

    readonly productSwitcherWorkloadPanel = this.page.getByTestId('workload-select-panel');

    readonly productSwitcherDataEngineeringIcon = this.page.getByTestId('product data-engineering').locator('tri-svg-icon').locator('img');
    readonly productSwitcherDataFactoryIcon = this.page.getByTestId('product data-factory').locator('tri-svg-icon').locator('img');
    readonly productSwitcherDataScienceIcon = this.page.getByTestId('product data-science').locator('tri-svg-icon').locator('img');
    readonly productSwitcherDataWarehouseIcon = this.page.getByTestId('product data-warehouse').locator('tri-svg-icon').locator('img');
    readonly productSwitcherPowerBIIcon = this.page.getByTestId('product power-bi').locator('tri-svg-icon').locator('img');
    readonly productSwitcherDataActivatorIcon = this.page.getByTestId('product data-activator').locator('tri-svg-icon').locator('img');
    readonly productSwitcherRealTimeAnalyticsIcon = this.page.getByTestId('product kusto').locator('tri-svg-icon').locator('img');
    readonly productSwitcherExtensionApiPlaygroundIcon = this.page.getByTestId('product api-playground').locator('tri-svg-icon').locator('img');

    readonly productSwitcherDataEngineeringName = this.page.getByTestId('product data-engineering').getByTestId('workload-name');
    readonly productSwitcherDataFactoryName = this.page.getByTestId('product data-factory').getByTestId('workload-name');
    readonly productSwitcherDataScienceName = this.page.getByTestId('product data-science').getByTestId('workload-name');
    readonly productSwitcherDataWarehouseName = this.page.getByTestId('product data-warehouse').getByTestId('workload-name');
    readonly productSwitcherPowerBIName = this.page.getByTestId('product power-bi').getByTestId('workload-name');
    readonly productSwitcherDataActivatorName = this.page.getByTestId('product data-activator').getByTestId('workload-name');
    readonly productSwitcherRealTimeAnalyticsName = this.page.getByTestId('product kusto').getByTestId('workload-name');
    readonly productSwitcherExtensionApiPlaygroundName = this.page.getByTestId('product api-playground').getByTestId('workload-name');

    readonly productSwitcherDataEngineeringButton = this.page.getByTestId('product data-engineering');
    readonly productSwitcherDataFactoryButton = this.page.getByTestId('product data-factory');
    readonly productSwitcherDataScienceButton = this.page.getByTestId('product data-science');
    readonly productSwitcherDataWarehouseButton = this.page.getByTestId('product data-warehouse');
    readonly productSwitcherPowerBIButton = this.page.getByTestId('product power-bi');
    readonly productSwitcherDataActivatorButton = this.page.getByTestId('product data-activator');
    readonly productSwitcherRealTimeAnalyticsButton = this.page.getByTestId('product kusto');
    readonly productSwitcherExtensionApiPlaygroundButton = this.page.getByTestId('product api-playground');
}
