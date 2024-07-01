import { test, expect } from "@playwright/test";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form layout page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layout").click();
  });

  test("Input Fields", async ({ page }) => {
    const usingTheGridComponent = page
      .locator("nb-card", {
        hasText: "Using the Grid",
      })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridComponent.fill("jdoe@gmail.com");
    //clear the input words
    await usingTheGridComponent.clear();
    await usingTheGridComponent.pressSequentially("jaypsdugaojo@gmail.com", {
      delay: 100,
    });

    // generic assertion
    const inputValue = await usingTheGridComponent.inputValue();
    expect(inputValue).toEqual("jaypsdugaojo@gmail.com");

    // locator assertion
    await expect(usingTheGridComponent).toHaveValue("jaypsdugaojo@gmail.com");
  });

  test("Radio Buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    // await usingTheGridForm.getByLabel("Option 1").check({ force: true });
    await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });

    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 1" })
      .isChecked();

    expect(radioStatus).toBeTruthy();

    // Locator Assertion
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 1" })
    ).toBeChecked();

    //Option 2 is checked
    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    // verify the option 1 is not checked
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy();

    // verify the option 2 is checked
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 2" })
        .isChecked()
    ).toBeTruthy();
  });
});

test("checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });

  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });

  //check all checkboxes
  const allCheckBoxes = await page.getByRole("checkbox");
  for (const box of await allCheckBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test("list and dropdown", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header nb-select");
  await dropDownMenu.click();

  page.getByRole("list"); //when the list have <ul> tag
  page.getByRole("listitem"); //when the list have <li> tag

  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]); //verify all value on dropdown

  await optionList.filter({ hasText: "Dark" }).click(); //select dark color

  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(34, 43, 69)"); //verify the background color is dark

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  await dropDownMenu.click();
  for (const color in colors) {
    await optionList.filter({ hasText: color }).click(); //Clicking all colors
    await expect(header).toHaveCSS("background-color", colors[color]);

    if (color != "Corporate") {
      //condition to stop the loop once the color is equal to corporate
      await dropDownMenu.click();
    }
  }
});

test("Tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const tooltipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });

  await tooltipCard.getByRole("button", { name: "Top" }).hover();

  // page.getByRole("tooltip"); - it will work if you have a role tooltip created
  const tooltip = await page.locator("nb-tooltip").textContent();
  expect(tooltip).toEqual("This is a tooltip");
});

test("Dialog Box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // trigger using default browser dialog box
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });

  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();

  await expect(page.locator("table tr").first()).not.toHaveText(
    'mdo@gmail.com"'
  );
});

test("web tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //1 - get the row by any test in this row
  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await targetRow.locator(".nb-edit").click(); //click the edit icon
  await page.locator("input-editor").getByPlaceholder("Age").clear(); //target the age text input and clear the value
  await page.locator("input-editor").getByPlaceholder("Age").fill("29"); //target the age text input and modify the value
  await page.locator(".nb-checkmark").click(); //click the check icon

  //2 - get the row based on the value in the specific column

  await page.locator(".ng2-smart-pagination-nav").getByText("2").click(); //trigger 2nd page pagination
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") }); //get the specific value using filter
  await targetRowById.locator(".nb-edit").click(); //click the edit icon
  await page.locator("input-editor").getByPlaceholder("E-mail").clear(); //target the age text input and clear the value
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("mark@yahoo.com"); //target the age text input and modify the value
  await page.locator(".nb-checkmark").click(); //click the check icon
  await expect(targetRowById.locator("td").nth(5)).toHaveText("mark@yahoo.com"); //verify the modified email value

  //3 Filter data tables.
  const ages = ["20", "30", "40", "200"];

  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear(); //find the input field of filter age
    await page.locator("input-filter").getByPlaceholder("Age").fill(age); //fill out the field of filfter age
    //filter all ages based on the array

    await page.waitForTimeout(500); //set a timeout

    const ageRows = page.locator("t-body tr"); //verify the filter results

    for (let rows of await ageRows.all()) {
      //looping of all results
      const cellValue = await rows.locator("td").last().textContent();

      //validation if the age is not existing
      if (age == "200") {
        expect(await page.getByRole("table").textContent()).toContain(
          "No data found"
        );
        expect(cellValue).toEqual(age);
      }
    }
  }
});

test("datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  //Set Dynamic Date
  let date = new Date();
  date.setDate(date.getDate() + 100);

  const expectedDate = date.getDate().toString(); //get the expected date and convert to string
  const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
  const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
  const expectedYear = date.getFullYear();
  const dateAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page //target the month and year in the dpicker
    .locator("nb-calendar-view-mode")
    .textContent();

  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
  while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();
    calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
  }

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click();

  await expect(calendarInputField).toHaveValue(dateAssert);
});

test("sliders", async ({ page }) => {
  //update attribute
  // const tempGauge = page.locator(
  //   '[tabtitle="Temperature"] ngx-temperature-dragger circle'
  // );
  // await tempGauge.evaluate((node) => {
  //   node.setAttribute("cx", "232.630");
  //   node.setAttribute("cy", "232.630");
  // });

  // await tempGauge.click();

  //mouse movement
  const tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger'
  );
  await tempBox.scrollIntoViewIfNeeded();
  const box = await tempBox.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();
  await expect(tempBox).toContainText("30");
});
