import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(private readonly page: Page) {
    this.emailInput = page.getByPlaceholder("email@example.com");
    this.passwordInput = page.getByPlaceholder("enter your passsword");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
