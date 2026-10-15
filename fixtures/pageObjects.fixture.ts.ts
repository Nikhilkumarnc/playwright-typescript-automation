
import { test as base } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderConfirmationPage } from "../pages/OrderConfirmationPage";
import { OrdersPage } from "../pages/OrdersPage";

type AllClassObjFixtures = {
  pages: {
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    orderConfirmationPage: OrderConfirmationPage;
    ordersPage: OrdersPage;
  };
};

export const test = base.extend<AllClassObjFixtures>({
  pages: async ({ page }, use) => {

    const pages = {

      loginPage: new LoginPage(page),
      homePage: new HomePage(page),
      cartPage: new CartPage(page),
      checkoutPage: new CheckoutPage(page),
      orderConfirmationPage: new OrderConfirmationPage(page),
      ordersPage: new OrdersPage(page),
    };

    await use(pages);
  },
});

export const expect = test.expect;
