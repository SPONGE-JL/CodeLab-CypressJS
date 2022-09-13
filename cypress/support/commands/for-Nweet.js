/* eslint-disable cypress/no-unnecessary-waiting */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import "cypress-file-upload";

/*
  # File upload
 */
Cypress.Commands.add("uploadFile", (inputId, fixturePath) => {
  cy.fixture(fixturePath, "binary")
    .then(Cypress.Blob.binaryStringToBlob)
    .then(fileContent => {
      cy.get(`input#${inputId}`).attachFile({
        fileContent,
        filePath: fixturePath,
        encoding: "utf-8",
        lastModified: new Date().getTime()
      });
    });
});

