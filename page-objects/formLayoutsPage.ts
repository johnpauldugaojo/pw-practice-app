import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {
  // private readonly page: Page; - removed due to helperbased method
  constructor(page: Page) {
    // this.page = page; removed due to helperbased method
    super(page);
  }

  /**
   * This method will fill out the Using The Grid Form Section
   * @param email - contains email of the user
   * @param password - contains password of the user
   * @param optionText - Select if what user choose the radio button
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOptions(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingTheGridForm = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByRole("textbox", { name: "Email" }).fill(email);
    await usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingTheGridForm
      .getByRole("radio", { name: optionText })
      .check({ force: true });
    await usingTheGridForm.getByRole("button").click();
  }

  /**
   * This method will fill out the Using The Inline Form Section
   * @param name - contains name of the user
   * @param email - contains email of the user
   * @param rememberMe - Checked if the user want to remember his creds
   */
  async submitInlineFormWithNameEmailAndCheckbox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    const usingTheInlineForm = this.page.locator("nb-card", {
      hasText: "Inline form",
    });

    await usingTheInlineForm
      .getByRole("textbox", { name: "Jane Doe" })
      .fill(name);

    await usingTheInlineForm
      .getByRole("textbox", { name: "Email" })
      .fill(email);

    if (rememberMe == true) {
      await usingTheInlineForm.getByRole("checkbox").check({ force: true });
    }
    await usingTheInlineForm.getByRole("button").click();
  }
}
