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
    cy.get("button[name=google]").contains("Continue with google");
    cy.get("button[name=github]").contains("Continue with github");
    // TODO: Google Authentication - https://docs.cypress.io/guides/end-to-end-testing/google-authentication#What-you-ll-learn
  });
});

describe("Try 'Sign In'", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("/");
  });

  it("should be success to 'Sign In' step from 'Create Account' step", () => {
    cy.get("input[name=email]").type(authPlainInfo.email);
    cy.get("input[name=password]").type("wrong-password");
    cy.get("input[type=submit]").click();
    cy.contains("이미 사용 중인 이메일입니다.");

    cy.get("#signUpToggle").click();
    cy.get("input[type=submit]").click();
    if (cy.contains("로그인 시도 횟수가 초과 되었습니다. 잠시 후 재시도 해주세요.")) {
      cy.log("Pass to login step (currently, access count is overwhelm)");
      return;
    }
    cy.contains("이메일 또는 비밀번호를 다시 한번 확인해주세요.");

    cy.get("input[name=password]").clear().type(authPlainInfo.password);
    cy.get("input[type=submit]").click();
    cy.contains("이메일 또는 비밀번호를 다시 한번 확인해주세요.")
      .should("not.exist");
  });
});