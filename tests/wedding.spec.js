import { test, expect } from "@playwright/test";

test("wedding planner supports editing, persistence, budget, guests, and mobile", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/wedding");
  await page.getByRole("button", { name: "Explore the demo" }).click();
  await page.getByRole("button", { name: "+ Add a task" }).click();
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("alert")).toContainText("valid task");
  await page
    .getByRole("textbox", { name: "Task", exact: true })
    .fill("Book photographer");
  await page.getByLabel("Who’s on it?").selectOption("Partner 1");
  await page.getByRole("button", { name: "Save changes" }).click();
  await page.getByRole("button", { name: /^Checklist/ }).click();
  await expect(
    page.getByRole("checkbox", { name: /Book photographer/ }),
  ).toBeVisible();
  await page.getByRole("checkbox", { name: /Book photographer/ }).check();
  await page.reload();
  await page.getByRole("button", { name: "Explore the demo" }).click();
  await page.getByRole("button", { name: /^Checklist/ }).click();
  await expect(
    page.getByRole("checkbox", { name: /Book photographer/ }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Budget", exact: true }).click();
  await page.getByRole("button", { name: "+ Add an expense" }).click();
  await page.getByLabel("Expense", { exact: true }).fill("Flowers");
  await page.getByLabel("Amount (USD)", { exact: true }).fill("250.50");
  await page.getByLabel("Payment", { exact: true }).selectOption("Paid");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Flowers", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Guest list", exact: true }).click();
  await page.getByRole("button", { name: "+ Add a guest" }).click();
  await page.getByLabel("Guest name").fill("Jamie Example");
  await page.getByLabel("RSVP").selectOption("Attending");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Jamie Example", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await page.getByRole("button", { name: "Delete this item" }).click();
  await page.getByRole("button", { name: "Delete item", exact: true }).click();
  await expect(page.getByText("Jamie Example", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Notes & ideas" }).click();
  await page.getByRole("button", { name: "+ Add a note" }).click();
  await page
    .getByLabel("Title", { exact: true })
    .fill("<img src=x onerror=alert(1)>");
  await page.getByLabel("Your idea").fill("A string, never executable markup.");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(
    page.getByText("<img src=x onerror=alert(1)>", { exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Overview", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Your day, coming together." }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/wedding-mobile.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({
    path: "test-results/wedding-desktop.png",
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("planner theme does not replace the existing home and portal", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("navigation").first()).toBeVisible();
  await page.goto("/portal");
  await expect(page.getByRole("heading").first()).toBeVisible();
});
