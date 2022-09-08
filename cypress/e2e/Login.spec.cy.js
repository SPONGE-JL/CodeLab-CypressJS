describe("Landing", () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  });
  
  it("should be rendered default components - navigator, footer", () => {
    cy.visit("/");
    cy.get("nav").get("a").should("have.attr", "href", "#/");
    cy.get("footer").contains("© 2022 Nwitter by Chloe");
  });

  it("should be rendered 'form' and 'toggle' for authentication option", () => {
    cy.visit("/");
    // Form
    cy.get("input[name=email]").should("be.empty")
      .invoke("attr", "placeholder").should("eq", "Email");
    cy.get("input[name=password]").should("be.empty")
      .invoke("attr", "placeholder").should("eq", "Password");
    cy.get("input[type=submit]").should("have.value", "Create Account");

    // Toggle: Create Account -> Sign In
    cy.get("#signUpToggle").should("have.value", "Sign In")
      .click().should("have.value", "Create Account");
    cy.get("input[type=submit]").should("have.value", "Login");

    // Reset: Sign In -> Create Account
    cy.get("#signUpToggle").click().should("have.value", "Sign In");
    cy.get("input[type=submit]").should("have.value", "Create Account");
  });

  it("should be rendered 'SSO buttons'", () => {
    cy.visit("/");
    cy.get("button[name=google]").contains("Continue with google");
    cy.get("button[name=github]").contains("Continue with github");
    // TODO: Google Authentication - https://docs.cypress.io/guides/end-to-end-testing/google-authentication#What-you-ll-learn
  });
});

describe("Try 'Sign In'", () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
  });

  it("should be success to create account", () => {
    cy.visit("/");
    cy.get("input[name=email]").type("ui-tester@nwitter.com");
    cy.get("input[name=password]").type("dummy-P@SSW0RD-wrong");
    cy.get("input[type=submit]").click();
    cy.contains("이미 사용 중인 이메일입니다.");

    cy.get("#signUpToggle").click();
    cy.get("input[type=submit]").click();
    cy.contains("이메일 또는 비밀번호를 다시 한번 확인해주세요.");
    
    cy.get("input[name=password]").clear().type("dummy-P@SSW0RD");
    cy.get("input[type=submit]").click();
  });
});