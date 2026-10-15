import { test, expect } from "../../fixtures/login.fixture";

test("@smoke Verify authenticated user", async ({
  authenticatedPage,
  pages,
}) => {
  await pages.homePage.verifyUserIsLoggedIn();
});
