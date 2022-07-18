/// <reference types="Cypress" />
describe('My Sixth Test Suite', function () {
    it('My Sixth Test Case', function () {
        cy.visit(Cypress.env('url')+"/AutomationPractice/")
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {        
            const textcontain = $el.text()
            if(textcontain.includes('Python')){
                cy.get("tr td:nth-child(2)").eq(index).next().then(function(price){
                    const pricetext = price.text()
                    expect(pricetext).to.equal('25')
                })
            }
            })

    })
})