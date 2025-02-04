import { Page, Locator } from '@playwright/test';

export class ViewDemoPage {
  readonly page: Page;
  private energyProfilingSectionTableView: Locator;
  private switchToWidgetView: Locator;
  private switchToListView: Locator;
  private apiUrlForWidgetView: string;
  private apiUrlForListView: string;

  constructor(page: Page) {
    this.page = page;
    this.energyProfilingSectionTableView = page.getByRole('link', {
      name: 'Fronius AT Energy Profiling',
    });
    this.switchToWidgetView = page.locator('.js-switch-to-widgetView');
    this.switchToListView = page.locator('.js-switch-to-tableView');
    this.apiUrlForWidgetView =
      'https://www.solarweb.com/ActualData/GetActualValues?withOnlineState=False';
    this.apiUrlForListView =
      'https://www.solarweb.com/ActualData/GetActualValues?withOnlineState=True';
  }

  /**
   *  function to click on Energy Profiling option depending on the view that opens by
   * using API calls
   */
  async clickOnEnergyProfiling() {
    // Wait for either Widget View or List View API response
    const detectedView = await Promise.race([
      this.page
        .waitForResponse(
          (response) =>
            response.url().includes(this.apiUrlForWidgetView) &&
            response.status() === 200
        )
        .then(() => 'widget'),
      this.page
        .waitForResponse(
          (response) =>
            response.url().includes(this.apiUrlForListView) &&
            response.status() === 200
        )
        .then(() => 'list'),
    ]);

    console.log(`Detected view: ${detectedView}`);

    if (detectedView === 'list') {
      console.log('List View is active. Switching to Widget View...');
      await Promise.all([
        this.page.waitForResponse(
          (response) =>
            response.url().includes(this.apiUrlForWidgetView) &&
            response.status() === 200
        ),
        this.switchToWidgetView.click(),
      ]);

      this.energyProfilingSectionTableView.click();
    } else {
      console.log('Already in Widget View...');
      this.energyProfilingSectionTableView.click();
    }
  }
}
