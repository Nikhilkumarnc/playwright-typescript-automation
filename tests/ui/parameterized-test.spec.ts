import { test } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage.ts";
import { HomePage } from "../../pages/HomePage.ts";

import loginDataParameterized from "../../test-data/loginDataParameterized.json";

import messages from "../../constants/messages.json";

for (const user of loginDataParameterized) {
  test(`Parameterization of Login  ${user.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(user.username, user.password);

    if (user.expectedResult === "success") {
      await homePage.verifyUserIsLoggedIn();
    } else {
      await loginPage.verifyLoginError(messages.loginErrorMsg);
    }

  });
}
