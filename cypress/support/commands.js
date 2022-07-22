// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
import ProductPage from '../support/pageObjects/ProductPage'
Cypress.Commands.add('selectProduct', (productName) => {
    const productPage = new ProductPage()

    productPage.getProductName().each(($el, index, $list) => {
        const producttext = $el.text()

        if (producttext.includes(productName)) {
            productPage.getAddButton().eq(index).click()
        }
    })
})
Cypress.Commands.add("LoginAPI", () => {
    cy.request("POST", "https://www.rahulshettyacademy.com/api/ecom/auth/login",
        { userEmail: "tanmayadash97@gmail.com", userPassword: "Tanmaya97@" }).then(function (response) {
            expect(response.status).to.eq(200)
            Cypress.env('token', response.body.token)
        })
})

Cypress.Commands.add("PhoenXLogin", () => {
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type("nivedha@ncompass.in")
    cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type("Admin123!")
    cy.get('.MuiButton-label').click()
})

Cypress.Commands.add("PhoenXAdminLogin", () => {
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type("akhilesh+wsc@phonexinc.com")
    cy.get(':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > .MuiInputBase-input').type("Admin123!")
    cy.get('.MuiButton-label').click()
})
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })