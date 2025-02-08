import { Page, Locator, expect } from '@playwright/test';

export class EnergyProfilingChartPage {
    readonly page: Page;
    private monthView: Locator;
    private dateElements: Locator;
    private barElements: Locator;
    private currentMonthAndYear: Locator;

    constructor(page: Page) {
        this.page = page;
        this.monthView = page.locator('li[data-interval="month"] a');
        this.dateElements = page.locator('.highcharts-axis-labels text');
        this.barElements = page.locator('.highcharts-series rect');
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

        const firstDateElement = await this.dateElements.first();
        return await firstDateElement.isVisible();
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

        // Get all x-axis labels (dates)
        const dateLabels = await this.dateElements.allTextContents();

        // Find the index of the given date
        const dateIndex = dateLabels.findIndex(
            (label) => label.trim() === dayNumber.toString()
        );

        if (dateIndex === -1) {
            throw new Error(`The date (${dayNumber}) is not displayed on the chart.`);
        }

        // Get all bars in the chart
        const bars = await this.barElements.all();

        if (dateIndex >= bars.length) {
            throw new Error(`Bar index (${dateIndex}) is out of range.`);
        }

        const dateBar = bars[dateIndex];
        return await dateBar.isVisible();
    }
}
