import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
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
  // const onFormsLayoutPage = new FormLayoutsPage(page);
  // const onDatePickerPage = new DatePickerPage(page);

  await pm.navigateTo().formLayoutsPage();
  await pm
    .onFormsLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOptions(
      "test@test.com",
      "Test1234",
      "Option 1"
    );
  await pm
    .onFormsLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      "Jayps Dugaojo",
      "Jaypsdugaojo@gmail.com",
      false
    );

  await pm.navigateTo().datePickerPage();
  await pm.datepickerPage().selectCommonDatePickerDateFromToday(10);
  await pm.datepickerPage().selectDatePickerWithRange(3, 15);
});
