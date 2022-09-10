describe("Landing", () => {
  beforeEach(() => {
    cy.removeAllCaches();
  });

  it("should be rendered default components - Navigator, Footer", () => {
    // Navigator
    cy.get("nav a").should("have.attr", "href", "#/");

    // Footer
    cy.get("footer").contains("© 2022 Nwitter by Chloe");
  });

  it("should be rendered 'form' and 'toggle' for authentication option", () => {
    // Form
    cy.get("input[name=email]").should("be.empty").invoke("attr", "placeholder").should("eq", "Email");
    cy.get("input[name=password]").should("be.empty").invoke("attr", "placeholder").should("eq", "Password");
    cy.checkAuthForm("Create Account", "Sign In");

    // Toggle: Regist -> Login
    cy.swithAuthMode();
    cy.checkAuthForm("Login", "Create Account");

    // Toggle: Login -> Regist
    cy.swithAuthMode();
    cy.checkAuthForm("Create Account", "Sign In");

    // SSO
    cy.get("button[name=google]").contains("Continue with google");
    cy.get("button[name=github]").contains("Continue with github");
  });
});
