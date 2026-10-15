import { test, BrowserContext, Page } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { OrderConfirmationPage } from "../../pages/OrderConfirmationPage";
import { ChildPage } from "../../pages/ChildPage";

import users from "../../test-data/users.json";

const userNik = users.userNik;

let globalContext: BrowserContext;
let page: Page;

test.beforeAll("beforeAll: inject storage state", async ({ browser }) => {
  globalContext = await browser.newContext();

  page = await globalContext.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login(userNik.email, userNik.password);

  await page.waitForURL(
    "https://rahulshettyacademy.com/client/#/dashboard/dash",
  );

  await globalContext.storageState({
    path: "state.json",
  });

  await globalContext.close();

  globalContext = await browser.newContext({
    storageState: "state.json",
  });

  page = await globalContext.newPage();
});

test("@place-order-api place and order withoug log in", async () => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const orderConfirmationPage = new OrderConfirmationPage(page);

  await loginPage.navigateToLoginPage();
  await homePage.verifyUserIsLoggedIn();
  await homePage.addProductToCart("ZARA COAT 3");
  await homePage.verifyUserIsLoggedIn();
  await homePage.isHomePage();
  await homePage.goToCart();
  await cartPage.waitForCartItems();
  await cartPage.clickCheckout();
  await checkoutPage.enterCVV("121");
  await checkoutPage.enterNameOnCard("Anshika");
  await checkoutPage.selectCountry("India");
  await checkoutPage.clickPlaceOrder();
  await orderConfirmationPage.verifyOrderConfirmation();

  const orderId = await orderConfirmationPage.getOrderId();
  console.log("orderId:", orderId);
  await homePage.clickHomeBtn();
  await homePage.isHomePage();
});

test("How to handle child page/tab", async () => {
  const homePage = new HomePage(page);

  await homePage.isHomePage();

  const [popup] = await Promise.all([
    globalContext.waitForEvent("page"),
    homePage.openQACareerLink(),
  ]);

  const childPage = new ChildPage(popup);
  await childPage.waitForPageLoad();
  const childPageText = await childPage.getHeadingText();
  console.log("childPageText: ", childPageText);
  await page.bringToFront(); // Bring the parent tab to the foreground.
  await homePage.clickOnSearchOption();
});
