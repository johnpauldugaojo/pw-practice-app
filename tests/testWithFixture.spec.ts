import { test } from "../test-options";
import { faker } from "@faker-js/faker";

test("parametized methods", async ({ pageManager }) => {
  // const navigateTo = new NavigationPage(page); refactor ung pageManager
  // const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
    1000
  )}@gmail.com`;

  await pageManager
    .onFormsLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOptions(
      process.env.USERNAME,
      process.env.PASSWORD,
      "Option 2"
    );

  await pageManager
    .onFormsLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false
    );
});
