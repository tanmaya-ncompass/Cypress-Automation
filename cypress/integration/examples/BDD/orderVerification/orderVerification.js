/// <reference types="Cypress" />

import PhoenXStockListpage from '../../../../support/pageObjects/PhoenXStockListPage'

let filename = 'E:/node/CypressAutomation/cypress/fixtures/phoenXdetails.json';

const StockListpage = new PhoenXStockListpage()
let orderNumber

Given('I opened Cart page and Verified the most recent item', () => {
    cy.visit(Cypress.env('url'))
    cy.PhoenXLogin()
    cy.wait(10000)
    StockListpage.getCartButton().click()

})

When('I placed the order', () => {
    cy.readFile(filename).then(temp => {
        cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + ']').then(() => {
            cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + '] [data-id=itemsInCart] [data-id=itemNumber]').each(($el, index, $list) => {
                const tempText = $el.text()
                var itemNumber = tempText.split(":")
                itemNumber = itemNumber[1].trim()
                if (itemNumber === temp.Buy.item_id) {
                    expect(itemNumber).to.equal(temp.Buy.item_id)
                }
            })
        })
    })
    cy.readFile(filename).then(temp => {
        cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + '] [data-id="checkout"]').click()
    })
    cy.get('.medium-5 > .px-bar-container > .px-calculation-bar > .grid-y > .MuiButton-contained > .MuiButton-label').click()
    cy.get('.MuiDialogActions-root > .MuiButton-contained > .MuiButton-label').click()
    cy.url().then(url => {
        cy.url().should('contain', 'order-release-confirmation')
    })
})

And('I opened the orders page', () => {
    cy.get('.link > .MuiSvgIcon-root').click()
    cy.wait(4000)
    cy.get(':nth-child(3) > .show > .cell').click()

    cy.get('.px-table > :nth-child(9)').then((element) => {
        let temp = element.text()
        orderNumber = temp.split(":")
        orderNumber = orderNumber[1].trim()
    })

})

Then('I verified the order number and order status', () => {

    cy.get('.px-table > :nth-child(9)').click()
    cy.get('h2').contains("Order").then((element) => {
        let tempText = element.text()
        let orderTxt = tempText.split(" ")
        orderTxt = orderTxt[1].trim()
        expect(orderTxt).to.equal(orderNumber)
    })
    cy.readFile(filename).then(temp => {
        temp.Order = {}
        temp.Order.orderNumber = orderNumber

        cy.get('.margin-right-1').should('contain' , 'Awaiting Payment')
        cy.get('[data-id="paymentStatus"]').should('contain' , 'Unpaid')

        cy.get('.margin-right-1').then((element) => {
            temp.Order.fulfilment = element.text()
        })
        cy.get('[data-id="paymentStatus"]').then((element) => {
            temp.Order.payment = element.text()
        })
        cy.writeFile(filename, temp)
    })
})

