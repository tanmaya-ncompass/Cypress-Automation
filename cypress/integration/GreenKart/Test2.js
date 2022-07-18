/// <reference types="Cypress" />
describe('My Second Test Suite', function () {
    it('My Second Test Case', function () {
        cy.visit(Cypress.env('url')+"/seleniumPractise/#/")
        cy.get(".search-keyword").type("ca")
        cy.wait(2000)
        cy.get('.products').as ('productLocator')

        cy.get('@productLocator').find('.product').should('have.length', 4)
        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
        const textVeg = $el.find('.product-name').text()
        if(textVeg.includes('Cashews')){
            cy.wrap($el).contains("ADD TO CART").click()
        }
        })

        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
        // cy.get('button').click()

    })
})