export class LoginPage {
  visit() {
    cy.visit('/');
  }

  login(user: string, password: string) {
    cy.get('[data-test="username"]').type(user);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]');
  }
}
