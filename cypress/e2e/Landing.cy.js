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
    cy.swithAuthForm();
    cy.checkAuthForm("Login", "Create Account");

    // Reset
    cy.swithAuthForm();
    cy.checkAuthForm("Create Account", "Sign In");

    // SSO
    cy.get("button[name=google]").contains("Continue with google");
    cy.get("button[name=github]").contains("Continue with github");
  });
});
