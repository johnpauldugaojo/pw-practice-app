import { test, expect } from "@playwright/test";

// to prevent repetitive situation
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layout").click();
});

test("local syntax rules", async ({ page }) => {
  //find by tag name
  await page.locator("input").first().click();

  // find by id
  page.locator("#inputEmail1");

  // Find by class value
  page.locator(".shape-rectangle");

  // Find by attribute
  page.locator('[placeholder="Email"]');

  //by class value full
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );
  // combine different selector
  page.locator('input [placeholder="Email"] [nbinput]');

  //byXpath (not recommended)
  page.locator('//*[@id="inputEmail1"]');

  // by partial text match
  page.locator(':text("Using")');

  // by exact text match
  page.locator(':text-is("Using the grid")');
});

test("Used faced locator", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();
  await page.getByLabel("Email").first().click();
  await page.getByPlaceholder("Jane Doe").click();
  await page.getByText("Form without labels").click();
  await page.getByTestId("SignIn").click();
  await page.getByTitle("IoT Dashboard").click();
});

test("Child Elements", async ({ page }) => {
  //parent > child
  await page.locator("nb-card nb-radio :text('Option 1')").click();
  //chaining
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text("Option 2")')
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("Parent Elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-warning") })
    .getByRole("textbox", { name: "Password" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" })
    .click();

  // await page
  //   .locator(':text-is("Using the grid")')
  //   .locator("..")
  //   .getByRole("textbox", { name: "Email" })
  //   .click();

  await page
    .getByText("Using the Grid")
    .locator("..")
    .getByRole("textbox", { name: "Email" })
    .click();
});

test("Reusing the locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic Form" });
  const emailForm = basicForm.getByRole("textbox", { name: "Email" });
  const passwordForm = basicForm.getByRole("textbox", { name: "Password" });

  await emailForm.fill("map@hrsmart.com");
  await passwordForm.fill("Test1234");
  await basicForm.locator("nb-checkbox").click();
  await basicForm.getByRole("button").click();

  await expect(emailForm).toHaveValue("map@hrsmart.com");
});

test("extracting values", async ({ page }) => {
  // Sigle Values
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic Form" });
  const button = await basicForm.locator("button").textContent();
  expect(button).toEqual("Submit");

  //all text values
  const allRadioButtons = await page.locator("nb-radio").allTextContents();
  expect(allRadioButtons).toContain("Option 1");

  //input value
  const emailField = basicForm.getByRole("textbox", { name: "email" });
  await emailField.fill("map@hrsmart.com");
  const emailValue = await emailField.inputValue();
  expect(emailValue).toEqual("map@hrsmart.com");

  //get value anttribute

  const placeholder = await emailField.getAttribute("placeholder");
  expect(placeholder).toEqual("Email");
});

test("Assertion", async ({ page }) => {
  const basicFormButton = page
    .locator("nb-card")
    .filter({ hasText: "Basic Form" })
    .locator("button");

  //General Assertion
  const value = 5;
  expect(value).toEqual(5);

  const text = await basicFormButton.textContent();
  expect(text).toEqual("Submit");

  // Locator Assertion
  await expect(basicFormButton).toHaveText("Submit");

  // Soft Assertion - will continue on the next execution
  await expect.soft(basicFormButton).toHaveText("Submit");
  await basicFormButton.click();
});

// test("the first test", async ({ page }) => {
//   await page.getByText("Form Layouts").click();
// });

// test("navigate to datepicker page", async ({ page }) => {
//   await page.getByText("Datepicker").click();
// });

// // group all test
// test.describe("Test suite 1", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.getByRole("link", { name: "Charts", exact: true }).click();
//   });

//   test("the first test1", async ({ page }) => {
//     await page.getByRole("link", { name: "Echarts", exact: true }).click();
//   });

//   // test("navigate to datepicker page1", async ({ page }) => {
//   //   await page.getByText("Datepicker").click();
//   // });
// });

// test.describe("Test suite 2", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.getByText("Forms").click();
//   });

//   test("the first test1", async ({ page }) => {
//     await page.getByText("Form Layout").click();
//   });

//   test("navigate to datepicker page1", async ({ page }) => {
//     await page.getByText("Datepicker").click();
//   });
// });
