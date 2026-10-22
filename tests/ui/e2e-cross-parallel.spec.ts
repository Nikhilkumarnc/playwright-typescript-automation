import { test, expect } from "../../fixtures/login.fixture";

import { generateRegisterUserData } from "../../utils/fakerDataUtility";
import usersOccupations from "../../test-data/usersOccupations.json";
import products from "../../test-data/products.json";
import messages from "../../constants/messages.json";

test.describe.configure({ mode: "parallel" });

test("@smoke Verify authenticated user", async ({
  authenticatedPage,
  pages,
}) => {
  await pages.homePage.verifyUserIsLoggedIn();
});

test("Example E2E test", async ({ pages, page }) => {
  const {
    loginPage,
    homePage,
    registerPage,
    cartPage,
    checkoutPage,
    orderConfirmationPage,
  } = pages;

  const user = generateRegisterUserData(usersOccupations.occupations["Dr."]);

  await loginPage.navigateToLoginPage();
  await loginPage.registerAccount();

  await registerPage.registerUser(user);
  await registerPage.waitForRegistrationSuccessMsg();
  await registerPage.clickRegistrationPageLoginBtn();

  await loginPage.isEmailFieldVisible();
  await loginPage.login(user.email, user.password);

  await homePage.verifyUserIsLoggedIn();
  await homePage.addProductToCart(products.adidasOriginal);
  await homePage.goToCart();

  await cartPage.waitForCartItems();
  await cartPage.clickCheckout();

  await checkoutPage.enterCVV("121");
  await checkoutPage.enterNameOnCard("Anshika");
  await checkoutPage.selectCountry("India");
  await checkoutPage.clickPlaceOrder();

  const actualOrderConfirmationMsg =
    await orderConfirmationPage.verifyOrderConfirmation();
  expect(actualOrderConfirmationMsg?.trim()).toBe(messages.orderSuccess);
  const orderId = await orderConfirmationPage.getOrderId();
  console.log("orderId:", orderId);

  await homePage.clickOnSignOutBtn();

  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/client/#/auth/login",
  );
});
