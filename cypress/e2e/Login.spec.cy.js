describe("Access 'Login'", () => {
  it("should be rendered that can toggle for authentication option", () => {
    cy.visit("/");
    // Form
    cy.get("input[name=email]").should("be.empty")
      .invoke("attr", "placeholder").should("eq", "Email");
    cy.get("input[name=password]").should("be.empty")
      .invoke("attr", "placeholder").should("eq", "Password");
    cy.get("input[type=submit]").should("have.value", "Create Account");

    // Change: Create Account -> Sign In
    cy.get("#signUpToggle")
      .should("have.value", "Sign In").click()
      .should("have.value", "Create Account");
    cy.get("input[type=submit]").should("have.value", "Login");

    // Reset: Sign In -> Create Account
    cy.get("#signUpToggle").click()
      .should("have.value", "Sign In");
    cy.get("input[type=submit]").should("have.value", "Create Account");
  });
});
