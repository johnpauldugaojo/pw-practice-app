import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase {
  // private readonly page: Page; removed due to helperbased method
  constructor(page: Page) {
    // this.page = page; removed due to helperbased method
    super(page);
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateAssert = await this.selectDateInThatCalendar(
      numberOfDaysFromToday
    );

    await expect(calendarInputField).toHaveValue(dateAssert);
  }

  async selectDatePickerWithRange(
    startDateFromToday: number,
    endDateFromToday: number
  ) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();
    const dateToAssertStart = await this.selectDateInThatCalendar(
      startDateFromToday
    );
    const dateToAssertEnd = await this.selectDateInThatCalendar(
      endDateFromToday
    );

    const dateToAssertWithRange = `${dateToAssertStart} - ${dateToAssertEnd}`;
    await expect(calendarInputField).toHaveValue(dateToAssertWithRange);
  }

  // reusable datepicker function
  private async selectDateInThatCalendar(numberOfDaysFromToday: number) {
    //Set Dynamic Date
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);

    const expectedDate = date.getDate().toString(); //get the expected date and convert to string
    const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page //target the month and year in the dpicker
      .locator("nb-calendar-view-mode")
      .textContent();

    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator('[class="day-cell ng-star-inserted"]')
      .or(this.page.locator('[class="range-cell day-cell ng-star-inserted"]')) //concatinate another locator
      .getByText(expectedDate, { exact: true })
      .click();

    return dateAssert;
  }
}
