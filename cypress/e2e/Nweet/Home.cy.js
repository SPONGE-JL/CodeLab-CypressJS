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

  it("should be rendered newly added component - Nweet (attach image)", () => {
    /* NweetForm */
    // Type text message
    const dummyMessage = `CyNweet (${new Date().toLocaleString()} GMT+9)`;
    cy.get("input[type=text").type(dummyMessage);

    // Attach the photo
    cy.uploadFile("attach-file", "images/emoji-flash-waving-cat.gif");
    cy.contains("Remove");

    // Remove
    cy.get("[ui-test-id='remote-attach']").click();
    cy.contains("Remove").should("not.exist");

    // Re-attach & Write new Nweet
    cy.uploadFile("attach-file", "images/emoji-flash-waving-cat.gif");
    cy.contains("Remove");
    cy.get("input[type=submit]").click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(300);

    // Check newly added Nweet
    cy.contains(dummyMessage);
    cy.get("div.container div div")
      .filter(`:contains('${dummyMessage}')`)
      .then($newNweet => $newNweet.length === 1);
  });

  // TODO: Test Nweet edit function

  // TODO: Test Nweet delete function

  after(() => {
    cy.withdrawal();
  });
});
