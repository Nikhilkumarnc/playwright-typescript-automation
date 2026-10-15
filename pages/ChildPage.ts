import { Page, Locator } from "@playwright/test";

export class ChildPage {
  private readonly childPage: Page;
  private readonly heading: Locator;

  constructor(childPage: Page) {
    this.childPage = childPage;

    this.heading = this.childPage.getByRole("heading", { level: 1 });
  }

  async waitForPageLoad(): Promise<void> {
    await this.heading.waitFor({ state: "visible" });
  }

  async getHeadingText(): Promise<string | null> {
    return await this.heading.textContent();
  }
}
