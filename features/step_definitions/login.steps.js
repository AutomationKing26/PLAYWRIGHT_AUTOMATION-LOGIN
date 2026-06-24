const { Given, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I open the login page', async function () {
  await this.page.goto('https://www.rahulshettyacademy.com/loginpagePractice/', { waitUntil: 'load', timeout: 30000 });
});

Then('the page title should contain {string}', async function (expected) {
  const title = await this.page.title();
  assert(title.includes(expected), `Expected title to contain "${expected}", got "${title}"`);
});
