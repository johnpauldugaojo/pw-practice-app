import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,
  expect: {
    timeout: 2000,
    // toHaveScreenshot: { maxDiffPixels: 150 },
  },

  retries: 1,
  reporter: [
    ["json", { outputFile: "test-results/jsonReport.json" }],
    ["junit", { outputFile: "test-results/junitReport.xml" }],
    ["html"],
  ],

  webServer: {
    command: "npm run start",
    url: "http://localhost:4200/",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: "http://localhost:4200/",
    globalsSqaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
    // using .env with itenerary operator ex. DEV=1 npx playwright test usePageObject.spec.ts --project=chromium
    baseURL:
      process.env.DEV === "1"
        ? "http://localhost:4201/"
        : process.env.STAGING == "1"
        ? "http://localhost:4202/"
        : "http://localhost:4200/",

    trace: "on-first-retry",
    actionTimeout: 20000,
    navigationTimeout: 25000,
    viewport: { width: 1920, height: 1080 },
    video: {
      mode: "off",
      size: { width: 1920, height: 1080 },
    },
  },

  projects: [
    {
      name: "dev",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4201/" },
    },

    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: {
        browserName: "firefox",
        video: {
          mode: "on",
          size: { width: 1920, height: 1080 },
        },
      },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "pageObjectFullScreen",
      testMatch: "usePageObject.spec.ts",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    // mobile emu
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",
      use: {
        ...devices["iPhone 14 Pro Max"],
        // viewport: { width: 414, height: 800 }, using viewport
      },
    },
  ],
});
