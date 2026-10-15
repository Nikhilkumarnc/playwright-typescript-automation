import { expect, test } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";
import { OrdersPage } from "../../pages/OrdersPage";

import users from "../../test-data/users.json";

const userSteve = users.userSteve;

type FakePayloadType = {
  data: [];
  message: string;
};

const fakePayload: FakePayloadType = {
  data: [],
  message: "No Orders",
};

let body = JSON.stringify(fakePayload);

test("Intercept: sending fake response to browser", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const ordersPage = new OrdersPage(page);

  await loginPage.navigateToLoginPage();

  await loginPage.login(userSteve.email, userSteve.password);

  await homePage.verifyUserIsLoggedIn();

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      await route.fulfill({
        response,
        body,
        contentType: "application/json",
      });
    },
  );

  await homePage.clickOrders();

  await ordersPage.waitForMsgLoc();

  await ordersPage.isNoOrdersMsgDisplayed();
});
