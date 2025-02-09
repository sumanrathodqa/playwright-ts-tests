import { test } from '../fixtures/testSetup';
import { expect } from '@playwright/test';

test.describe('Verify Energy Balance Chart Tests', () => {
  let energyProfilingChartPage;

  test.beforeEach(async ({ pom }) => {
    energyProfilingChartPage = pom.goToEnergyProfilingChartPage();
  });

  test('energy Balance chart loads successfully', async () => {
    const isChartVisible = await energyProfilingChartPage.checkIfChartIsPresent();
    await expect(isChartVisible).toBeTruthy();
  });

  test('displays energy data for yesterday', async () => {
    const isGraphVisible = await energyProfilingChartPage.checkIfChartIsPresentForYesterday();
    //await expect(isGraphVisible).toBeTruthy();
  });

  test('displays energy data for a selected date', async () => {
    const isGraphVisible = await energyProfilingChartPage.checkGraphForDate(10);
    await expect(isGraphVisible).toBeTruthy();
  });

});
