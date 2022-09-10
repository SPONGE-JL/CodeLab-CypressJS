describe("Nweet / Home", () => {
  before(() => {
    cy.removeAllCaches();
    cy.registNewUser();
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("should be rendered default components - Navigator, NweetForm, NweetList, Footer", () => {
    // Navigator
    const linkArray = ["#/", "#/profile"];
    cy.get("nav a").each((item, index, list) => {
      expect(list).to.have.length(linkArray.length);
      cy.wrap(item).should("have.attr", "href", linkArray[index]);
    });

    // NweetForm
    cy.get("input[type=text").should("be.empty").invoke("attr", "placeholder").should("eq", "What's on your mind?");
    cy.get("input[type=submit]").should("have.value", "→");
    cy.get("label span").contains("Add photos");

    // NweetList
    cy.get("div.container div").children("div");

    // Footer
    cy.get("footer").contains("© 2022 Nwitter by Chloe");
  });

  after(() => {
    cy.withdrawal();
  });
});
