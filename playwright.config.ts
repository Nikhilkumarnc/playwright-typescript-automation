import { defineConfig, devices } from "@playwright/test";
import { envConfig } from "./config/env.config";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["tests/**/*.spec.ts"],
  timeout: 35_000,

  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

  expect: { timeout: 35_000 },

  workers: process.env.CI ? 18 : undefined, // Use one worker in CI initially; let Playwright choose locally.

  retries: process.env.CI ? 1 : 0, // Retry a failed CI test once to help diagnose intermittent failures.

  use: {
    headless: !!process.env.CI, // Run headlessly in CI; preserve headed mode locally when CI is unset.
    baseURL: envConfig.baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "off",
  },

  projects: [
    {
      name: "Chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "WebKit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});
