import { test } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage";
import { HomePage } from "../../pages/HomePage";
import { ChildPage } from "../../pages/ChildPage";

import users from "../../test-data/users.json";
const userMarg = users.userMarg;

test("How to handle child window/tab", async ({ browser }) => {
  const context = await browser.newContext();

  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.navigateToLoginPage();

  await loginPage.login(userMarg.email, userMarg.password);

  await homePage.verifyUserIsLoggedIn();

  const [popup] = await Promise.all([
    context.waitForEvent("page"),
    homePage.openQACareerLink(),
  ]);

  const childPage = new ChildPage(popup);

  await childPage.waitForPageLoad();

  const childPageText = await childPage.getHeadingText();

  console.log(childPageText);
});
