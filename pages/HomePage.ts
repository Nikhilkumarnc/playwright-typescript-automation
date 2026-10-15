import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  private readonly homeBtn: Locator;
  private readonly homePageLocator: Locator;
  private readonly productCards: Locator;
  private readonly productNames: Locator;
  private readonly cartIcon: Locator;
  private readonly spinner: Locator;
  private readonly childPageLink: Locator;
  private readonly signOutBtn: Locator;
  private readonly ordersBtn: Locator;
  private readonly searchOption: Locator;

  constructor(page: Page) {
    this.page = page;

    this.productCards = this.page.locator(".card");

    this.productNames = this.page.locator(".card b");

    this.cartIcon = this.page.locator('[routerlink="/dashboard/cart"]');

    this.spinner = this.page.locator(".ngx-spinner-overlay");

    this.childPageLink = this.page.getByRole("link", {
      name: "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator.",
    });

    this.signOutBtn = this.page.getByRole("button", {
      name: "Sign Out",
    });

    this.ordersBtn = this.page.getByRole("button", { name: "ORDERS" });

    this.homeBtn = this.page.getByRole("button", { name: "HOME" });

    this.homePageLocator = this.page
      .locator("//p[contains(normalize-space(), 'Home')]")
      .nth(1);

    this.searchOption = this.page.getByRole("textbox", { name: "search" });
  }

  async clickHomeBtn() {
    await this.homeBtn.click();
  }

  async isHomePage(): Promise<void> {
    await expect(this.homeBtn).toBeVisible();
  }

  async verifyUserIsLoggedIn(): Promise<void> {
    await expect(this.signOutBtn).toBeVisible({
      timeout: 30000,
    });
  }

  async addProductToCart(productName: string) {
    await this.productCards
      .filter({
        has: this.page.locator("b", {
          hasText: productName,
        }),
      })
      .getByRole("button", {
        name: "Add To Cart",
      })
      .click();

    await this.spinner.waitFor({
      state: "hidden",
    });
  }

  async getAllProductNames() {
    return await this.productNames.allTextContents();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async openQACareerLink() {
    return this.childPageLink.click();
  }

  async clickOrders() {
    await this.ordersBtn.click();
  }

  async clickOnSearchOption() {
    await expect(this.searchOption).toBeVisible();
    await this.searchOption.click();
  }
}
