import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  private readonly cartList: Locator;
  private readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.cartList = page.getByRole("button", { name: "Checkout" });

    this.checkoutBtn = page.getByRole("button", {
      name: "Checkout",
    });
  }

  async waitForCartItems(): Promise<void> {
    await expect(this.cartList).toBeVisible();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutBtn.click();
  }
}
