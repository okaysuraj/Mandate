import { test, expect } from '@playwright/test';

test.describe('Mandate E2E Workflow', () => {
  const testUser = {
    name: 'Playwright Tester',
    email: `tester_${Date.now()}@example.com`,
    password: 'password123'
  };

  test('Should register, navigate workspaces, and create a task', async ({ page }) => {
    // 1. Go to landing page and navigate to Auth
    await page.goto('/');
    
    // We might be redirected to /auth directly or be on landing page
    if (await page.locator('text="Get Started"').isVisible()) {
      await page.click('text="Get Started"');
    }

    // 2. Register new user
    // We should be on the register page now
    await page.waitForURL('**/register');
    await page.fill('input[placeholder="John Doe"]', testUser.name);
    await page.fill('input[type="email"]', testUser.email);
    await page.fill('input[type="password"]', testUser.password);
    await page.click('button:has-text("Sign Up")');

    // 3. Verify successful redirect to Dashboard (HomePage)
    // The homepage has a h1 with the current view (default 'Today')
    await expect(page.locator('h1', { hasText: 'Today' })).toBeVisible();

    // 4. Create a task
    await page.click('button:has-text("Add task")');
    await page.fill('input[placeholder="Enter task title"]', 'My Automated Task');
    
    // Using the textarea
    await page.fill('textarea[placeholder="Task details and instructions..."]', 'This task was created by Playwright');
    
    await page.click('button:has-text("Create Task")');

    // 5. Navigate to Kanban Board
    await page.click('button:has-text("Kanban Board")');
    await expect(page.locator('h1', { hasText: 'Kanban' })).toBeVisible();
    
    // 6. Verify task appears in the Kanban view
    await expect(page.locator('text="My Automated Task"')).toBeVisible();
  });
});
