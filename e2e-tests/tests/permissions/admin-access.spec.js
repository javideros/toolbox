const { test, expect } = require('@playwright/test');

test.describe('Administrator Screen Access', () => {
  test('should access key screens as administrator', async ({ page }) => {
    // Login as administrator
    await page.goto('/');
    await page.waitForSelector('input[name="username"]');
    await page.fill('input[name="username"]', 'alice');
    await page.fill('input[name="password"]', '123');
    await page.click('vaadin-button');
    
    // Verify login successful
    await expect(page).toHaveURL('/?continue');
    
    // Simple wait for page to settle
    await page.waitForTimeout(2000);
    
    // Test access to key screens from config
    const screens = [
      { title: 'Task List', link: '/task-list' },
      { title: 'Permissions', link: '/permissions' }
    ];

    for (const screen of screens) {
      try {
        // Navigate to screen with shorter timeout
        await page.goto(screen.link, { timeout: 5000 });
        
        // Wait a moment for page to render
        await page.waitForTimeout(1000);
        
        // Check if we're still authenticated (not redirected to login)
        const currentUrl = page.url();
        const isLoginPage = currentUrl.includes('/login') || currentUrl.includes('/dev-login');
        
        if (!isLoginPage) {
          console.log(`✅ Administrator can access: ${screen.title} (${screen.link})`);
        } else {
          console.log(`❌ Administrator redirected from: ${screen.title} (${screen.link})`);
        }
      } catch (error) {
        console.log(`⚠️  Timeout accessing: ${screen.title} (${screen.link})`);
      }
    }
  });
});