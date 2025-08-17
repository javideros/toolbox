const { test, expect } = require('@playwright/test');

test.describe('Authentication', () => {
  test('should login as admin and see dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Wait for login form to load
    await page.waitForSelector('input[name="username"]');
    
    // Fill login form with existing test user
    await page.fill('input[name="username"]', 'alice');
    await page.fill('input[name="password"]', '123');
    
    // Click login button
    const loginButton = page.locator('vaadin-button').first();
    await loginButton.click();
    
    // Verify successful login - should redirect to home with continue param
    await expect(page).toHaveURL('/?continue');
    // Simple wait for page to settle
    await page.waitForTimeout(2000);
    // Verify we're not on login page
    await expect(page.locator('input[name="username"]')).not.toBeVisible();
  });

  test('should login as user and see dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Wait for login form to load
    await page.waitForSelector('input[name="username"]');
    
    // Fill login form with existing test user
    await page.fill('input[name="username"]', 'ursula');
    await page.fill('input[name="password"]', '123');
    
    // Click login button
    const loginButton = page.locator('vaadin-button').first();
    await loginButton.click();
    
    // Verify successful login
    await expect(page).toHaveURL('/?continue');
    // Simple wait for page to settle
    await page.waitForTimeout(2000);
    // Verify we're not on login page
    await expect(page.locator('input[name="username"]')).not.toBeVisible();
  });

  test('should reject invalid credentials', async ({ page }) => {
    await page.goto('/');
    
    // Wait for login form to load
    await page.waitForSelector('input[name="username"]');
    
    // Fill with invalid credentials
    await page.fill('input[name="username"]', 'invalid');
    await page.fill('input[name="password"]', 'wrong');
    
    // Click login button
    const loginButton = page.locator('vaadin-button').first();
    await loginButton.click();
    
    // Should stay on dev-login page with error
    await expect(page).toHaveURL(/\/dev-login\?error/);
  });
});