import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  // readonly page: Page;
  // readonly formLayoutsMenuItem: Locator;
  // readonly datePickerMenuItem: Locator;
  // readonly smartTableMenuItem: Locator;
  // readonly toastrMenuItem: Locator;
  // readonly toolTipMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    // this.page = page;
    /**
     * This block of code is sample of refactoring using locator page
    this.formLayoutsMenuItem = page.getByText("Form Layout");
    this.datePickerMenuItem = page.getByText("Datepicker");
    this.smartTableMenuItem = page.getByText("Smart Table");
    this.toastrMenuItem = page.getByText("Toastr");
    this.toolTipMenuItem = page.getByText("Tooltip");
     *
     */
  }

  async formLayoutsPage() {
    // await this.page.getByText("Forms").click();
    await this.selectGroupMenuItem("Forms");
    // await this.formLayoutsMenuItem.click(); code for refactoring using locator page
    await this.page.getByText("Form Layout").click();
    await this.waitForNumberOfSeconds(2);
  }

  async datePickerPage() {
    // await this.page.getByText("Forms").click();
    await this.selectGroupMenuItem("Forms");
    await this.page.waitForTimeout(1000);
    await this.page.getByText("Datepicker").click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async tooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");

    if (expandedState == "false") {
      await groupMenuItem.click();
    }
  }
}
