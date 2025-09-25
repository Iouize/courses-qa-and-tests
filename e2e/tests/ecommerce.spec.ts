import test, { expect, Page } from "@playwright/test";

async function acceptCookies(page:Page) {
  const acceptCookiesButton = page.getByRole("button", { name: "Consent"});

  if (await acceptCookiesButton.isVisible()) {
    await acceptCookiesButton.click();
  }
}


test.describe("Ecommerce's product page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://automationexercise.com/");
    await acceptCookies(page);
  });

  test("should go to product page", async ({ page }) => {
    // const nav = page.getByRole('navigation');
    // await expect(nav).toBeVisible();

    await page.getByRole("link", { name: " Products" }).click();
    expect(page).toHaveURL("https://automationexercise.com/products");
    expect(await page.title()).toBe("Automation Exercise - All Products");


  });

  test("should find a t-shirt", async ({ page }) => {
    await page.getByRole("link", { name: " Products" }).click();
    await page.getByRole("textbox", { name: "Search Product" }).fill("t-shirt");
    await page.getByRole("button", { name: "" }).click();
    const products = page.locator(".features_items .product-image-wrapper");
    await expect(products).toHaveCount(3);
  });

  test("should contains product's details like title and price", async ({ page, }) => {
    await page.goto("https://automationexercise.com/product_details/30");

    expect(await page.title()).toBe("Automation Exercise - Product Details");
    await expect(
      page.getByRole("heading", { name: "Premium Polo T-Shirts" })
    ).toBeVisible();

    await expect(page.getByText("Rs.")).toBeVisible();
    await expect(page.getByRole("button", { name: " Add to cart" })).toBeVisible();
  });

  test("should add a product to cart", async ({ page }) => {
    await page.getByRole('link', { name: ' Cart' }).click();
    expect(page).toHaveURL("https://automationexercise.com/view_cart");

    const emptyCartMessage = page.locator('#empty_cart');

    if (await emptyCartMessage.isVisible()) {
      await page.getByRole('link', { name: 'here' }).click();

      await page.locator('.nav.nav-pills.nav-justified > li > a').first().click();

      await page.getByRole('button', { name: ' Add to cart' }).click();

      await page.getByRole('link', { name: 'View Cart' }).click();
    }

    await expect(page.locator('#cart_info')).toBeVisible();

    const rows = await page.$$('table tbody tr');
    expect(rows.length).toBeGreaterThan(0);

    await expect(page.getByRole('cell', { name: 'Product Image' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Blue Top Women > Tops' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Rs.' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: '1' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Rs.' }).nth(1)).toBeVisible();
    await expect(page.getByRole('cell', { name: '' })).toBeVisible();

  });
});
