import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("navigate to form page @smoke", async ({ page }) => {
  const pm = new PageManager(page);
  // const navigateTo = new NavigationPage(page); //create a variable to store the class //change using pageManager
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("parametized methods", async ({ page }) => {
  // const navigateTo = new NavigationPage(page); refactor ung pageManager
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    100
  )}@gmail.com`;
  // const onFormsLayoutPage = new FormLayoutsPage(page);
  // const onDatePickerPage = new DatePickerPage(page);

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormsLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOptions(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Option 2"
    );
  await page.screenshot({ path: "screenshots/formLayoutsPage.png" });

  // const buffer = await page.screenshot();
  // console.log(buffer.toString("base64"));
  await pm
    .onFormsLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false
    );

  await page.locator("nb-card", {
    hasText: "Inline form",
  });
  // .screenshot({ path: "screenshots/inlineForm.png" });

  await pm.navigateTo().datePickerPage();
  await pm.datepickerPage().selectCommonDatePickerDateFromToday(10);
  await pm.datepickerPage().selectDatePickerWithRange(3, 15);
});

test.only("Testing with argos ci", async ({ page }) => {
  const pm = new PageManager(page);
  // const navigateTo = new NavigationPage(page); //create a variable to store the class //change using pageManager
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerPage();
});
