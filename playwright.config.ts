import { defineConfig, devices } from "@playwright/test";
import { envConfig } from "./config/env.config";

export default defineConfig({
  testDir: "./tests",
  testMatch: ["tests/**/*.spec.ts"],
  timeout: 35_000,

  reporter: [
    ["html", { outputFolder: "playwright-report", open: "on-failure" }],
  ],

  expect: { timeout: 35_000 },

  use: {
    headless: false,
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
