/// <reference types="Cypress" />
describe('My Fifth Test Suite', function () {
    it('My Fifth Test Case', function () {
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        cy.get('#alertbtn').click()
        cy.get('#confirmbtn').click()
        //window allert
        cy.on('window:alert',(str) => {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
        cy.on('window:confirm',(str) => {
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })
        //delete "target" attribute to avoid child tab
        cy.get('#opentab').invoke('removeAttr','target').click()

        cy.url().should('include','rahulshettyacademy')
        cy.go('back')

    })
})