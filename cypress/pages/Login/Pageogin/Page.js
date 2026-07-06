export class LoginPage {
  visit() {
    cy.visit('/');
  }

  login(user, pass) {
    cy.get('[data-test="username"]').clear().type(user);
    cy.get('[data-test="password"]').clear().type(pass);
    cy.get('[data-test="login-button"]').click();
  }

  getErrorMessage() {
    return cy.get('[data-test="error"]');
  }
}
