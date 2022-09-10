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

/*
  # Authentication
 */

Cypress.Commands.add("registNewUser", () => {
  const timestamp = Math.floor(+ new Date() / 1000);
  const randomEmail = `auto_ui_tester-no.${timestamp}@nwitter.com`;
  const password = "Cypress*P@SSWORD";
  cy.submitAuthForm(randomEmail, password);
  cy.wait(1500);
});

Cypress.Commands.add("submitAuthForm", (email, password) => {
  cy.get("input[name=email]").clear().type(email);
  cy.get("input[name=password]").clear().type(password);
  cy.clickSubmit();
});

Cypress.Commands.add("clickSubmit", () => {
  cy.get("input[type=submit]").click();
});

Cypress.Commands.add("checkAuthForm", (submitButtonPresent, togglePresent) => {
  cy.get("input[type=submit]").should("have.value", submitButtonPresent);
  cy.get("#signUpToggle").should("have.value", togglePresent);
});

Cypress.Commands.add("logout", () => {
  cy.visit("/#/profile");
  cy.get("#logout").click();
});

Cypress.Commands.add("withdrawal", () => {
  cy.visit("/#/profile");
  cy.wait(1200);
  cy.get("button#withdrawal").trigger("mouseover").click();
  cy.on("window:confirm", (alertMessage) => {
    expect(alertMessage).to.equal("[확인] 회원 탈퇴를 진행합니다. (삭제된 계정은 복구가 불가능합니다.)");
    return true;
  });
  cy.wait(800);
});
