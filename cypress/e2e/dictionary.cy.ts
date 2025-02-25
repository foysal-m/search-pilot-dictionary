/// <reference types="cypress" />

describe("Dictionary App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4000");
    cy.intercept(
      "GET",
      "https://api.dictionaryapi.dev/api/v2/entries/en/*",
      (req) => {
        // Intercept the request and delay the response by 2 seconds
        req.on("response", (res) => {
          res.setDelay(2000);
        });
      }
    ).as("getWordData");
  });

  it("should show the loading spinner when searching for a word", () => {
    cy.get('input[name="word"]').type("hello");
    cy.get('button[type="submit"]').click();

    cy.get('[data-cy="loading"]').should("be.visible");

    // Wait for the API request to complete
    cy.wait("@getWordData");

    cy.get('[data-cy="loading"]').should("not.exist");
  });

  it("should show an error message when no definitions are found", () => {
    cy.get('input[name="word"]').type("nonexistentword");
    cy.get('button[type="submit"]').click();

    cy.wait("@getWordData");

    cy.contains("No Definitions Found").should("be.visible");
  });

  it("should display the word data correctly when the word is found", () => {
    cy.get('input[name="word"]').type("hello");
    cy.get('button[type="submit"]').click();

    cy.wait("@getWordData");

    cy.contains("hello").should("be.visible");
    cy.contains("/həˈləʊ/").should("be.visible");
    cy.contains("noun").should("be.visible");
    cy.contains("source:“https://en.wiktionary.org/wiki/hello”").should(
      "be.visible"
    );
  });
});
