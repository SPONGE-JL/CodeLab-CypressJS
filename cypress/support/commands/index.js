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

// ! Import using ES2015 & CommonJS syntax:
// Commands for basic (commonly used)
import "./basic"; require("./basic");

// Commands for functions > matching with "cypress/e2e/{function}" : "cypress/support/commands/for-{function}"
import "./for-Auth"; require("./for-Auth");
import "./for-Nweet"; require("./for-Nweet");
