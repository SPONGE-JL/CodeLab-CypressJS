describe("Auth / SocialLogin", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");
    cy.visit("/");
  });

  it("should be success 'popup login' with Google", () => {
    cy.log("TODO: Google Authentication - https://docs.cypress.io/guides/end-to-end-testing/google-authentication#What-you-ll-learn");
  });

  it("should be success 'popup login' with GitHub", () => {
    cy.log("TODO: Google Authentication - https://docs.cypress.io/guides/end-to-end-testing/google-authentication#What-you-ll-learn");
  });
});