/// <reference types="Cypress" />
var ls = require('local-storage');

let localStorageDetails = 'E:/node/CypressAutomation/cypress/fixtures/phoenXLocalStorage.json'

let details = {},
    keys = Object.keys(localStorage),
    i = keys.length;


Given('I open the url', () => {
    cy.visit(Cypress.env('url'))
})

When('I put the Email and password', () => {
    cy.PhoenXLogin()
    cy.wait(10000)
})


And('I Got all the local storage Items', () => {
    cy.readFile(localStorageDetails).then(temp => {
        for (var key in details) {}
        while (i--) {details[keys[i]] = localStorage.getItem(keys[i])}
    })
})


Then('I Stored the local storage Items to the fixtures', () => {

        cy.writeFile(localStorageDetails, details)
})




// let keys = Object.keys(localStorage),
//     i = keys.length;

// let localStorageDetails = 'E:/node/CypressAutomation/cypress/fixtures/phoenXLocalStorage.json'

// cy.readFile(localStorageDetails).then(temp => {
//     let details = temp
//     cy.visit('https://wsc.phonexcorp.com/stock', {
//         onBeforeLoad: function (window) {
//             for (var key in details) {
//                 window.localStorage.setItem(key, details[key])
//             }
//         }
//     })
// })