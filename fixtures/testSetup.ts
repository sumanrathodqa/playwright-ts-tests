import { test as base } from '@playwright/test';
import { PageObjectManager } from '../pages/pageObjectManager';

export type TestSetup = {
  pom: PageObjectManager;
};

export const test = base.extend<TestSetup>({
  pom: async ({ page }, use) => {
    const pom = new PageObjectManager(page);

    // Navigate and perform initial setup
    await page.goto('/');
    await pom.goToHomePage().acceptCookies();
    await pom.goToHomePage().clickViewDemoButton();
    await pom.goToViewDemoPage().clickOnEnergyProfiling();
    await pom.goToEnergyProfilingPage().clickOnEnergyBalanceTab();
    await pom.goToEnergyProfilingChartPage().clickOnMonthView();
    await use(pom);

    // Cleanup: Close the page after test execution
    await page.close();
  },
});
