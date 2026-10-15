import { Page, Locator, expect } from "@playwright/test";
import { RegisterUserType } from "../utils/fakerDataUtility";
import messages from "../constants/messages.json";

export class RegisterPage {
  private readonly page: Page;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly email: Locator;
  private readonly phoneNumber: Locator;
  private readonly password: Locator;
  private readonly confirmPassword: Locator;
  private readonly occupation: Locator;
  private readonly gender: Locator;
  private readonly adultCheckbox: Locator;
  private readonly registerButton: Locator;
  readonly userRegistrationSuccessMsg: Locator;
  private readonly ifRegistrationFailsMsg: Locator;
  private readonly registrationPageLoginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.email = page.getByPlaceholder("email@example.com");
    this.phoneNumber = page.getByPlaceholder("enter your number");
    this.password = page.locator('input[type="password"]').nth(0);
    this.confirmPassword = page.locator('input[type="password"]').nth(1);
    this.occupation = page.locator("select");
    this.gender = page.getByLabel("Male", { exact: true });
    this.adultCheckbox = page.getByRole("checkbox");
    this.registerButton = page.getByRole("button", {
      name: "Register",
      exact: true,
    });
    this.userRegistrationSuccessMsg = page.getByRole("heading", {
      name: messages.userRegistrationSuccessMsg,
    });
    this.ifRegistrationFailsMsg = page.locator('[role="alert"]');
    this.registrationPageLoginBtn = page.getByRole("button", { name: "Login" });
  }

  async registerUser(user: RegisterUserType): Promise<void> {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.phoneNumber.fill(user.phoneNumber);

    await this.occupation.selectOption({
      label: user.occupation,
    });

    await this.page.getByLabel(user.gender, { exact: true }).check();

    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.confirmPassword);

    if (user.isAdult) {
      await this.adultCheckbox.check();
    }

    await this.registerButton.click();
  }

  async waitForRegistrationSuccessMsg(): Promise<void> {
    await expect(this.userRegistrationSuccessMsg).toBeVisible();
  }

  async waitForRegistrationFailureMsg(): Promise<void> {
    await expect(this.ifRegistrationFailsMsg).toBeVisible();
  }

  async clickRegistrationPageLoginBtn() {
    await this.registrationPageLoginBtn.click();
  }
}
