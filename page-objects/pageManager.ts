import { test, expect, Page } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage"; //class created from page-ojects
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatePickerPage } from "../page-objects/datePickerPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutsPage: FormLayoutsPage;
  private readonly datePickerPage: DatePickerPage;
  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.formLayoutsPage = new FormLayoutsPage(this.page);
    this.datePickerPage = new DatePickerPage(this.page);
  }

  navigateTo() {
    return this.navigationPage;
  }

  onFormsLayoutsPage() {
    return this.formLayoutsPage;
  }

  datepickerPage() {
    return this.datePickerPage;
  }
}
