import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;

  private readonly cvvCode: Locator;
  private readonly nameOnCard: Locator;
  private readonly selectCountryField: Locator;
  private readonly countryOptions: Locator;
  private readonly countryDropdown: Locator;
  private readonly placeOrderLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.cvvCode = this.page.locator('[class="input txt"]').first();

    this.nameOnCard = this.page.locator('[class="input txt"]').nth(1);

    this.selectCountryField = this.page.getByPlaceholder("Select Country");

    this.countryOptions = this.page.locator(".ta-results button");

    this.countryDropdown = this.page.locator(".ta-results");

    this.placeOrderLink = this.page.locator(
      ".btnn.action__submit.ng-star-inserted",
    );
  }

  async enterCVV(cvv: string) {
    await this.cvvCode.fill(cvv);
  }

  async enterNameOnCard(name: string) {
    await this.nameOnCard.fill(name);
  }

  async selectCountry(country: string) {
    await this.selectCountryField.pressSequentially(country.substring(0, 3), {
      delay: 100,
    });

    await this.countryOptions.first().waitFor();

    await this.countryDropdown.waitFor();

    const countCountries = await this.countryOptions.count();

    for (let i = 0; i < countCountries; i++) {
      const countryName = (
        await this.countryOptions.nth(i).textContent()
      )?.trim();

      if (countryName === country) {
        await this.countryOptions.nth(i).click();
        break;
      }
    }
  }

  async clickPlaceOrder() {
    await this.placeOrderLink.click();
  }
}
