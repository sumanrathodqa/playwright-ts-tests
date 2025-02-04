import { test } from '../fixtures/testSetup';

test.describe('Verify Energy Balance Chart Tests', () => {
  let energyProfilingChartPage;

  test.beforeEach(async ({ pom }) => {
    energyProfilingChartPage = pom.goToEnergyProfilingChartPage();
  });

  test('energy Balance chart loads successfully', async () => {
    await energyProfilingChartPage.checkIfChartIsPresent();
  });

  test('displays energy data for yesterday', async () => {
    await energyProfilingChartPage.checkIfChartIsPresentForYesterday();
  });

  test('displays energy data for a selected date', async () => {
    await energyProfilingChartPage.checkGraphForDate(2);
  });
});
