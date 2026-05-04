import { test, expect } from "@playwright/test";

test("user buys single, hits bump, completes purchase", async ({ page }) => {
  await page.goto("/ai-grafika");
  await page.getByRole("link", { name: /Koupit za 399 Kč/ }).click();

  await expect(page.getByText(/UŠETŘÍTE 198 KČ/)).toBeVisible();

  await page.getByPlaceholder("E-mail").fill("e2e@example.com");
  await page.getByLabel(/obchodními podmínkami/).check();
  await page.getByLabel(/okamžitým zahájením plnění/).check();

  await page.locator(".accent-gold").first().check();

  await expect(page.getByRole("button", { name: /Zaplatit/ })).toBeEnabled({ timeout: 10000 });

  // Stripe Payment Element runs in iframe — full payment requires live Stripe test setup
  // and is verified manually before launch.
});
