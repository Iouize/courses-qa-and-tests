import test, { expect, Page } from "@playwright/test";

test.describe("Signup page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should display email error message for invalid email", async ({ page }) => {
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="email"]', "invalid-email");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    const errorMessage = await page.locator("text=L'adresse e-mail n'est pas valide.");
    await expect(errorMessage).toBeVisible();
  });

  test("should display error message when fields are empty", async ({ page }) => {
    await page.click('button[type="submit"]');

    const errorMessage = await page.locator("text=Tous les champs sont requis.");
    await expect(errorMessage).toBeVisible();
  });

  test("should ceate account successfully with valid inputs", async ({ page }) => {
    await page.fill('input[name="username"]', "testuser");
    await page.fill('input[name="email"]', "test@mail.fr");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    const successMessage = await page.locator("text=Compte créé avec succès !");
    await expect(successMessage).toBeVisible();
  });


});
