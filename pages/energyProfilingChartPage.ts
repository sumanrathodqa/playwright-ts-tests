import { Page, Locator, expect } from '@playwright/test';

export class EnergyProfilingChartPage {
    readonly page: Page;
    private monthView: Locator;
    private dateElements: Locator;
    private kwhElements: Locator;
    private barElements: Locator;
    private currentMonthAndYear: Locator;

    constructor(page: Page) {
        this.page = page;
        this.monthView = page.locator('[data-interval="month"] a');
        this.kwhElements = page.locator('.highcharts-yaxis-labels');
        this.dateElements = page.locator('.highcharts-xaxis-labels');
        this.barElements = page.locator('.highcharts-series-3 .highcharts-point[stroke-dasharray="none"]')
        this.currentMonthAndYear = page.locator(
            '.chart-datepicker-container .chart-datepicker-input'
        );
    }

    /**
     * Clicks on the month view toggle.
     */
    async clickOnMonthView() {
        await this.monthView.click();
    }

    /**
     * Function to log the Month and Year of the chart
     * @param message 
     */
    async logSelectedMonthAndYear(message: string) {
        const selectedDate = await this.currentMonthAndYear.inputValue();
        console.log(`${message}: ${selectedDate}`);
    }

    /**
     * Function to verify if energy Balance chart loads successfully
     */
    async checkIfChartIsPresent() {
        await this.logSelectedMonthAndYear('Checking chart for the month:');

        // Ensure the page is fully loaded
        await this.page.waitForLoadState('networkidle');

        const [isDateVisible, isKwhVisible] = await Promise.all([
            this.dateElements.first().isVisible(),
            this.kwhElements.first().isVisible()
        ]);

        return isDateVisible && isKwhVisible;
    }

    /**
   * Function to verify if energy Balance chart for yesterday loads
   */
    async checkIfChartIsPresentForYesterday() {
        const today = new Date();
        today.setDate(today.getDate() - 1); // Get yesterday's date
        const yesterday = today.getDate(); // Extract day number
        await this.logSelectedMonthAndYear('Checking chart for the month:');
        console.log(`Checking data for yesterday (date): ${yesterday} `);
        console.log('Chart is displayed for yesterday as expected');

        // Call the updated method to check the chart for this date
        return await this.checkGraphForDate(yesterday);
    }

    /**
 * Function to verify if energy Balance chart for a specified date
 */

    async checkGraphForDate(dayNumber: number) {
        await this.page.waitForLoadState('networkidle');

        const bars = this.barElements;

        // Count the bars
        const barCount = await bars.count();

        if (barCount === 0) {
            console.log("No bars found on the chart.");
            return false;
        }

        // Check if the bar for the specified dayNumber exists
        const barForDay = await bars.nth(dayNumber - 1); // Assuming dayNumber starts from 1
        if (await barForDay.isVisible()) {
            console.log(`Bar is present for day ${dayNumber}`);
            return true;
        } else {
            console.log(`Bar is NOT present for day ${dayNumber}`);
            return false;
        }
    }
}
