import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
  retries: 1,
  reporter: "html",

  use: {
    globalsSqaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
    // using .env with itenerary operator ex. DEV=1 npx playwright test usePageObject.spec.ts --project=chromium
    baseURL: "http://localhost:4200/",
  },

  projects: [
    {
      name: "chromium",
    },
  ],
});
