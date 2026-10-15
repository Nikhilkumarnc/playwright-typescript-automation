import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly loginErrMsgLoc: Locator;
  private readonly registerAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.loginErrMsgLoc = page.locator('[role="alert"]');
    this.registerAccountLink = page.getByRole("link", {
      name: "Register here",
    });
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto("#/auth/login", {
      waitUntil: "domcontentloaded",
    });
  }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
  }

  async verifyLoginError(expectedMessage: string) {
    console.log(
      "LoginErrMsgLoc innnerText: ",
      await this.loginErrMsgLoc.textContent(),
    );
    await expect(this.loginErrMsgLoc).toHaveText(expectedMessage);
  }

  async registerAccount() {
    await this.registerAccountLink.click();
  }

  async isEmailFieldVisible() {
    await expect(this.email).toBeVisible();
  }
}
