// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("swithAuthForm", () => {
  cy.toggle("#signUpToggle");
});

Cypress.Commands.add("toggle", (id) => {
  cy.get(id).click();
});

Cypress.Commands.add("checkAuthForm", (submitButtonPresent, togglePresent) => {
  cy.get("input[type=submit]").should("have.value", submitButtonPresent);
  cy.get("#signUpToggle").should("have.value", togglePresent);
});

Cypress.Commands.add("submitAuthForm", (email, password) => {
  cy.get("input[name=email]").clear().type(email);
  cy.get("input[name=password]").clear().type(password);
  cy.clickSubmit();
});

Cypress.Commands.add("clickSubmit", () => {
  cy.get("input[type=submit]").click();
});
