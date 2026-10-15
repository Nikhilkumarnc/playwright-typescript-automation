import { test, expect } from "@playwright/test";
import { generateRegisterUserData } from "../../utils/fakerDataUtility";
import { RegisterPage } from "../../pages/RegisterPage";
import usersOccupations from "../../test-data/usersOccupations.json";

test("Register a new user with dynamic data", async ({ page }) => {
  const user = generateRegisterUserData(usersOccupations.occupations["Dr."]);

  const registerPage = new RegisterPage(page);

  await page.goto("#/auth/register");

  await registerPage.registerUser(user);

  await expect(registerPage.userRegistrationSuccessMsg).toBeVisible();
});
