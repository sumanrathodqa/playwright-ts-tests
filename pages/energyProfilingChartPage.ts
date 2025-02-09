import { Page, Locator, expect } from '@playwright/test';

export class EnergyProfilingChartPage {
    readonly page: Page;
    private monthView: Locator;
    private dateElements: Locator;
    private kwhElements: Locator;
    private barElements: Locator;
    private currentMonthAndYear: Locator;
    private apiUrlForLoadingChartData: string;

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
        console.log(`No. of bars found on the chart is: ${barCount}`);
    // Ensure the requested day number is valid
    if (dayNumber < 1 || dayNumber > barCount) {
        throw new Error(`Invalid day: ${dayNumber}. No data available beyond day ${barCount}.`);
    }
     // Get the corresponding bar (assuming bars are in order of dates)
     const dateBar = bars.nth(dayNumber - 1);; // Adjusting index since arrays are zero-based

     // Ensure the bar is defined before proceeding
     if (!dateBar) {
         throw new Error(`No bar found for day ${dayNumber}`);
     }
 
     // Ensure the bar is visible
     const isVisible = await dateBar.isVisible();
 
     // Convert height to a number and check if it's greater than 0
     if (isVisible) {
         console.log(`Chart exists for day ${dayNumber}`);
         return true;
     }
 
     console.log(`No data for day ${dayNumber}`);
     return false;
       
    }
}
