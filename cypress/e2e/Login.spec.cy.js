import authPlainInfo from "../fixtures/auth/plain-info.json";

describe("Landing", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("/");
  });
  
  it("should be rendered default components - navigator, footer", () => {
    cy.get("nav").get("a").should("have.attr", "href", "#/");
    cy.get("footer").contains("© 2022 Nwitter by Chloe");
  });

  it("should be rendered 'form' and 'toggle' for authentication option", () => {
    // Form
    cy.get("input[name=email]").should("be.empty").invoke("attr", "placeholder").should("eq", "Email");
    cy.get("input[name=password]").should("be.empty").invoke("attr", "placeholder").should("eq", "Password");
    cy.checkAuthForm("Create Account", "Sign In");

    // Toggle
    cy.toggle("#signUpToggle");
    cy.checkAuthForm("Login", "Create Account");

    // Reset
    cy.toggle("#signUpToggle");
    cy.checkAuthForm("Create Account", "Sign In");
  });
});

describe("Try 'Sign In'", () => {
  const { email, password } = authPlainInfo;

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("/");
  });

  it("should be success to 'Sign In' step from 'Create Account' step", () => {
    // Try 'Create Account'
    cy.submitAuthForm(email, `wrong-${password}`);
    cy.contains("이미 사용 중인 이메일입니다.");

    // Try 'Sign In'
    cy.toggle("#signUpToggle");
    cy.clickSubmit();
    // cy.contains("이메일 또는 비밀번호를 다시 한번 확인해주세요.");

    // Try 'Sign In' with right info
    cy.submitAuthForm(email, password);
    cy.contains("이메일 또는 비밀번호를 다시 한번 확인해주세요.")
      .should("not.exist");
  });

  it("should be rendered 'SSO buttons'", () => {
    cy.get("button[name=google]").contains("Continue with google");
    cy.get("button[name=github]").contains("Continue with github");
    // TODO: Google Authentication - https://docs.cypress.io/guides/end-to-end-testing/google-authentication#What-you-ll-learn
  });
});