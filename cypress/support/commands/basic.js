/* eslint-disable cypress/no-unnecessary-waiting */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/*
  # Common
 */
Cypress.Commands.add("removeAllCaches", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  cy.visit("/");
});

/*
  # Toggling
 */
Cypress.Commands.add("swithAuthMode", () => {
  cy.toggle("#signUpToggle");
});

Cypress.Commands.add("toggle", (id) => {
  cy.get(id).click();
});
