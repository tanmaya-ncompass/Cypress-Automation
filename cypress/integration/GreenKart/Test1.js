/// <reference types="Cypress" />
describe('My First Test Suite', function () {
    it('My first Test Case', function () {
        cy.visit(Cypress.env('url')+"/seleniumPractise/#/")
        cy.get(".search-keyword").type("ca")
        cy.wait(2000)
        //cy.get('.product:visible').should('have.length',4)
        cy.get('.products').as ('productLocator')

        cy.get('@productLocator').find('.product').should('have.length', 4)
        cy.get('@productLocator').find('.product').eq(1).contains("ADD TO CART").click();

        cy.get('@productLocator').find('.product').each(($el, index, $list) => {

        const textVeg = $el.find('.product-name').text()
        if(textVeg.includes('Cashews')){
            cy.wrap($el).contains("ADD TO CART").click()
        }
        })

        cy.get('.brand').should('have.text','GREENKART')

        console.log("Hello")
        cy.get('.brand').then(function(logoelement){
            cy.log(logoelement.text())
        })

    })
})