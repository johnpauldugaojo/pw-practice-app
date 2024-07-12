import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(process.env.URL);
  await page.getByText("Button Triggering AJAX Request").click();
  testInfo.setTimeout(testInfo.timeout + 2000);
});

test("Auto Waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  // await successButton.click();

  // const text = await successButton.textContent();

  // await successButton.waitFor({ state: "attached" });
  // const text = await successButton.allTextContents();
  // expect(text).toContain("Data loaded with AJAX get request.");

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test.skip("Alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  // wait for the selector
  // await page.waitForSelector(".bg-success");

  // wait for particular response
  // await page.waitForResponse("http://www.uitestingplayground.com/ajaxdata");

  // wait for network calls to be completed
  await page.waitForLoadState("networkidle");
  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test.skip("timeouts", async ({ page }) => {
  test.slow();
  const successButton = page.locator(".bg-success");
  await successButton.click({ timeout: 16000 });
});
