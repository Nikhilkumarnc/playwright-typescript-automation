import { defineConfig, devices } from "@playwright/test";

const config = defineConfig({
  testDir: "./tests",
  timeout: 60000,
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  expect: {
    timeout: 60000,
  },

  use: {
    baseURL: "https://rahulshettyacademy.com/client/",
    headless: false,
    screenshot: "off",
    trace: "off",
    video: "off",
  },

  projects: [
    {
      name: "Chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
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

export default config;
