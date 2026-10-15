import { errors, expect, test } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage.ts";
import { HomePage } from "../../pages/HomePage.ts";
import { CartPage } from "../../pages/CartPage.ts";
import { CheckoutPage } from "../../pages/CheckoutPage.ts";
import { OrderConfirmationPage } from "../../pages/OrderConfirmationPage.ts";

import users from "../../test-data/users.json";
import products from "../../test-data/products.json";
import messages from "../../constants/messages.json";

const userTrev = users.userTrev;

test.describe.configure({ mode: "parallel" });

test("Test 1 parallel : Login and place order ", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderConfirmationPage = new OrderConfirmationPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.login(userTrev.email, userTrev.password);
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
});

test("Test 2 parallel: validate title", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await expect(page).toHaveTitle("Let's Shop");
});
