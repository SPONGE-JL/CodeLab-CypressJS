// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("toggle", (id) => {
  cy.get(id).click();
});

Cypress.Commands.add("checkAuthForm", (submitButtonPresent, togglePresent) => {
  cy.get("input[type=submit]").should("have.value", submitButtonPresent);
  cy.get("#signUpToggle").should("have.value", togglePresent);
});

Cypress.Commands.add("submitAuthForm", (email, password) => {
  cy.get("input[name=email]").type(email);
  cy.get("input[name=password]").type(password);
  cy.clickSubmit();
});

Cypress.Commands.add("clickSubmit", () => {
  cy.get("input[type=submit]").click();
});

Cypress.Commands.add("checkAuthResult", () => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500).get("span").then($span => {
    switch ($span.text()) {
    case "이메일 또는 비밀번호를 다시 한번 확인해주세요.":
      cy.log("[PASS] Retry needs with right auth-info.");
      break;
    case "로그인 시도 횟수가 초과 되었습니다. 잠시 후 재시도 해주세요.":
      cy.log("[WARN] Retry count has been over.");
      break;
    default:
      throw new Error("No covered cases."); 
    }
  });

});