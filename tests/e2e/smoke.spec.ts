import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
    
  test('App loads and displays main components', async ({ page }) => {
    await page.goto('/');
    
    // Check for title or main heading
    // Adjust selector based on actual UI
    await expect(page).toHaveTitle(/TransmitFlow/i);
    await expect(page.getByText('Seamless file transmission')).toBeVisible();
    
    // Check for main action buttons/tabs
    await expect(page.getByText('Send')).toBeVisible();
    await expect(page.getByText('Receive')).toBeVisible();
  });

  test('Navigate to Receive tab and check for room code input/scanner', async ({ page }) => {
    await page.goto('/');
    
    // Click Receive tab if it's a tab interface
    const receiveTab = page.getByRole('tab', { name: 'Receive' });
    if (await receiveTab.isVisible()) {
        await receiveTab.click();
    } else {
        // Maybe it's a button to switch mode?
        // Assuming tab based on package.json dependencies having tabs
        await page.getByText('Receive').click();
    }

    // Should see input for room code or scan button
    await expect(page.getByPlaceholder(/Enter 8-digit code/i)).toBeVisible();
  });

  test('Offline page loads', async ({ page }) => {
    await page.goto('/offline');
    await expect(page.getByText('You are offline')).toBeVisible();
  });
});
