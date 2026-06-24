class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginUrl = 'https://www.rahulshettyacademy.com/loginpagePractice/';
    
    // Locators
    this.usernameInput = '#username';
    this.passwordInput = "[type='password']";
    this.signInButton = '#signInBtn';
  }

  // Navigation methods
  async navigateToLoginPage() {
    await this.page.goto(this.loginUrl, { waitUntil: 'load', timeout: 30000 });
  }

  // User interaction methods
  async enterUsername(username) {
    await this.page.locator(this.usernameInput).type(username);
  }

  async enterPassword(password) {
    await this.page.locator(this.passwordInput).type(password);
  }

  async clickSignInButton() {
    await this.page.locator(this.signInButton).click();
  }

  // Combined action methods
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSignInButton();
  }

  // Assertion/verification methods
  async isSignInButtonVisible() {
    return await this.page.locator(this.signInButton).isVisible();
  }

  async isUsernameInputVisible() {
    return await this.page.locator(this.usernameInput).isVisible();
  }

  async isPasswordInputVisible() {
    return await this.page.locator(this.passwordInput).isVisible();
  }
}

module.exports = LoginPage;
