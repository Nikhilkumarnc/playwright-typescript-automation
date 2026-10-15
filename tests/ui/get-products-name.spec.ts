import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";

import users from "../../test-data/users.json";

const userLora = users.userLora;

test("basic test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.navigateToLoginPage();

  await expect(page).toHaveTitle("Let's Shop");

  await loginPage.login(userLora.email, userLora.password);

  await homePage.verifyUserIsLoggedIn();
  const allProductNames = await homePage.getAllProductNames();

  console.log(allProductNames);
});
