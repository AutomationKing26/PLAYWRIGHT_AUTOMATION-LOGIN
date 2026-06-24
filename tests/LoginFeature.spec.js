const { test, expect } = require('@playwright/test');

test('Verify the Login Functionality', async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/loginpagePractice/");
//   await expect(page).toHaveTitle(/Rahulshetty Academy/);

  await page.locator('#username').type("rahulshetty");
  await page.locator("[type='password']").type("learning");
  await page.locator('#signInBtn').click();
  
});

