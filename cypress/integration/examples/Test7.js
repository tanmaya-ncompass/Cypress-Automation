/// <reference types="Cypress" />
describe('My 7th Test Suite', function () {
    it('My 7th Test Case', function () {
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        
        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Top').click()
        cy.url().should('include','top')

    })
})