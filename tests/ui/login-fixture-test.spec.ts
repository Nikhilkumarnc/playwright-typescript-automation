import { test, expect } from "../../fixtures/login.fixture";
import { OrdersPage } from "../../pages/OrdersPage";

test("@smoke Verify authenticated user", async ({
  authenticatedPage,
  pages,
}) => {
  await pages.homePage.verifyUserIsLoggedIn();
});
