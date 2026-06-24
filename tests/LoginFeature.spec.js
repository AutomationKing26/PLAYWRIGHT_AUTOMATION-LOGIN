const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test('Verify the Login Functionality', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  await loginPage.navigateToLoginPage();
  await loginPage.login("rahulshetty", "learning");

});

 