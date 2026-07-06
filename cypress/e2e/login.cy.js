import { LoginPage } from '../pages/Login/Pageogin/Page';

const loginPage = new LoginPage();

describe('SauceDemo login', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('connecte un utilisateur valide', () => {
    cy.fixture('users').then((users) => {
      const user = users.find((item) => item.username === 'standard_user');

      loginPage.login(user.username, user.password);

      cy.url().should('include', user.expectUrl);
      cy.get('[data-test="title"]').should('contain.text', 'Products');
    });
  });

  it('refuse un utilisateur invalide', () => {
    cy.fixture('users').then((users) => {
      const user = users.find((item) => item.username === 'wrong_user');

      loginPage.login(user.username, user.password);

      loginPage.getErrorMessage().should('be.visible').and('contain.text', 'Username and password do not match any user in this service');
    });
  });

  it('affiche une erreur lorsque les champs sont vides', () => {
    cy.get('[data-test="login-button"]').click();

    loginPage.getErrorMessage().should('be.visible').and('contain.text', 'Username is required');
  });

  it('bloque un utilisateur verrouillé', () => {
    cy.fixture('users').then((users) => {
      const user = users.find((item) => item.username === 'locked_out_user');

      loginPage.login(user.username, user.password);

      loginPage.getErrorMessage().should('be.visible').and('contain.text', 'Sorry, this user has been locked out.');
    });
  });

  it('connecte un utilisateur problématique', () => {
    cy.fixture('users').then((users) => {
      const user = users.find((item) => item.username === 'problem_user');

      loginPage.login(user.username, user.password);

      cy.url().should('include', user.expectUrl);
      cy.get('[data-test="title"]').should('contain.text', 'Products');
    });
  });
});
