import { Page, Locator } from '@playwright/test';

export class EnergyProfilingPage {
  readonly page: Page;
  private energyBalanceTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.energyBalanceTab = page.locator('a[href*="/Chart/Chart"]');
  }

  async clickOnEnergyBalanceTab() {
    await this.energyBalanceTab.click();
  }
}
