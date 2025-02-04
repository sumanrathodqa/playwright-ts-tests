import { Page } from '@playwright/test';
import { HomePage } from './homePage';
import { ViewDemoPage } from './viewDemoPage';
import { EnergyProfilingPage } from './energyProfilingPage';
import { EnergyProfilingChartPage } from './energyProfilingChartPage';

export class PageObjectManager {
  private page: Page;
  private homePage: HomePage | null = null;
  private viewDemoPage: ViewDemoPage | null = null;
  private energyProfilingPage: EnergyProfilingPage | null = null;
  private energyProfilingChartPage: EnergyProfilingChartPage | null = null;

  constructor(page: Page) {
    this.page = page;
  }

  goToHomePage(): HomePage {
    if (!this.homePage) {
      this.homePage = new HomePage(this.page);
    }
    return this.homePage;
  }

  goToViewDemoPage(): ViewDemoPage {
    if (!this.viewDemoPage) {
      this.viewDemoPage = new ViewDemoPage(this.page);
    }
    return this.viewDemoPage;
  }

  goToEnergyProfilingPage(): EnergyProfilingPage {
    if (!this.energyProfilingPage) {
      this.energyProfilingPage = new EnergyProfilingPage(this.page);
    }
    return this.energyProfilingPage;
  }

  goToEnergyProfilingChartPage(): EnergyProfilingChartPage {
    if (!this.energyProfilingChartPage) {
      this.energyProfilingChartPage = new EnergyProfilingChartPage(this.page);
    }
    return this.energyProfilingChartPage;
  }
}
