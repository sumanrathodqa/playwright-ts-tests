import { Page, Locator } from '@playwright/test';

export class HomePage {
  private page: Page;
  private cookieAcceptButton: Locator;
  private viewDemoButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cookieAcceptButton = page.locator(
      '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'
    );
    this.viewDemoButton = page.locator('.btn-landing-demo');
  }

  async acceptCookies() {
    await this.cookieAcceptButton.click();
  }

  async clickViewDemoButton() {
    await this.viewDemoButton.click();
  }
}
