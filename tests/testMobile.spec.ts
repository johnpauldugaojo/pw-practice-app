import { test, expect } from "@playwright/test";

test("Input Fields", async ({ page }, testInfo) => {
  /* if (testInfo.retry) {
    //do someting ex. clean up db
  }*/
  await page.goto("/");

  if (testInfo.project.name == "mobile") {
    await page.locator(".sidebar-toggle").click();
  }

  await page.getByText("Forms").click();
  await page.getByText("Form Layout").click();

  if (testInfo.project.name == "mobile") {
    await page.locator(".sidebar-toggle").click();
  }

  const usingTheGridComponent = page
    .locator("nb-card", {
      hasText: "Using the Grid",
    })
    .getByRole("textbox", { name: "Email" });

  await usingTheGridComponent.fill("jdoe@gmail.com");
  //clear the input words
  await usingTheGridComponent.clear();
  await usingTheGridComponent.pressSequentially("jaypsdugaojo@gmail.com");
  // await usingTheGridComponent.pressSequentially("jaypsdugaojo@gmail.com");
});
