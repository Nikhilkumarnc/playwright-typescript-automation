import { expect, test, request } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";
import { APIUtils } from "../../utils/APIUtils";

import users from "../../test-data/users.json";

const userKane = users.userKane;

const loginPayload = {
  userEmail: userKane.email,
  userPassword: userKane.password,
};

const orderPayload = {
  orders: [
    {
      country: "Cuba",
      productOrderedId: "6960ea76c941646b7a8b3dd5",
    },
  ],
};

let response: {
  token: string;
  orderId: string;
};

test.beforeAll("beforeAll: get token, orderId", async ({}) => {
  const apiContext = await request.newContext();

  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);

  await apiContext.dispose();
});

test("login-api: inject token and place order", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, response.token);

  await loginPage.navigateToLoginPage();

  await homePage.verifyUserIsLoggedIn();

  await homePage.clickOrders();

  const orderRow = page.locator("tr").filter({
    hasText: response.orderId,
  });

  await orderRow.getByRole("button", { name: "View" }).click();

  const orderDetails = await page.locator(".col-text").textContent();

  expect(response.orderId.includes(orderDetails ?? "")).toBeTruthy();
});
