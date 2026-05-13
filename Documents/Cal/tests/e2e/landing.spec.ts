import { expect, test } from "@playwright/test";

test.describe("unauthenticated landing", () => {
  test("renders the Google sign-in gate on desktop", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loading CalendarHub")).toBeHidden();

    await expect(page.getByRole("heading", { name: "Aura" })).toBeVisible();
    await expect(page.getByText("Sign in with Google to sync events into your private calendar workspace.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign in with Google" })).toBeVisible();
  });

  test("keeps the sign-in card usable on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Loading CalendarHub")).toBeHidden();

    const signInButton = page.getByRole("button", { name: "Sign in with Google" });
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toBeEnabled();
  });
});
