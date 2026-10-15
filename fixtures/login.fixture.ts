import { test as base } from "./pageObjects.fixture.ts";

import users from "../test-data/users.json";

const userTod = users.userTod;

type LoginFixture = {
  authenticatedPage: void;
};

export const test = base.extend<LoginFixture>({
  authenticatedPage: async ({ pages }, use) => {
    await pages.loginPage.navigateToLoginPage();
    await pages.loginPage.login(userTod.email, userTod.password);
    await use();
  },
});

export const expect = test.expect;
