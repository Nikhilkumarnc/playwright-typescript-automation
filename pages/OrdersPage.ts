import { Locator, Page, expect } from "@playwright/test";

export class OrdersPage {
  private readonly table: Locator;
  private readonly tableBody: Locator;
  private readonly rows: Locator;
  private readonly noOrdersMessageLoc: Locator;
  private readonly viewOrderBtn: Locator;
  private readonly notAuthorizedMsgLoc: Locator;

  constructor(private readonly page: Page) {
    this.table = page.locator("table");
    this.tableBody = page.locator("tbody");
    this.rows = page.locator("tbody tr");
    this.noOrdersMessageLoc = page.getByText(
      "You have No Orders to show at this time. Please Visit Back Us",
    );
    this.viewOrderBtn = page.locator("//button[text()='View']");
    this.notAuthorizedMsgLoc = page.locator("div.email-wrapper > p.blink_me");
  }

  async waitForTableToLoad() {
    await this.tableBody.waitFor();
  }

  async waitForViewOrderBtn() {
    await this.viewOrderBtn.first().waitFor();
  }

  async isViewOrderBtnVisible() {
    await expect(this.viewOrderBtn.first()).toBeVisible();
  }

  async clickOnViewOrderBtn() {
    await this.viewOrderBtn.first().click();
  }

  async waitForMsgLoc() {
    await this.noOrdersMessageLoc.waitFor();
  }

  async isNoOrdersMsgDisplayed() {
    await expect(this.noOrdersMessageLoc).toBeVisible();
  }
}
