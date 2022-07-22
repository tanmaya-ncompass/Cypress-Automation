/// <reference types="Cypress" />

import PhoenXStockListpage from '../../../../support/pageObjects/PhoenXStockListPage'

const StockListpage = new PhoenXStockListpage()

let filename = 'E:/node/CypressAutomation/cypress/fixtures/phoenXdetails.json';

Given('I opened Cart page', () => {
    cy.visit('https://wsc.phonexcorp.com/')
    cy.PhoenXLogin()
    cy.wait(10000)
    StockListpage.getCartButton().click()
})

When('I Verified the warehouse and item number for Buy option', () => {
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

})

And('I Verified the availability', () => {
    cy.readFile(filename).then(temp => {
        cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + ']').then(() => {
            cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + '] [data-id=itemsInCart] [data-id=itemNumber]').each(($el, index, $list) => {
                const tempText = $el.text()
                var itemNumber = tempText.split(":")
                itemNumber = itemNumber[1].trim()
                if (itemNumber === temp.Buy.item_id) {
                    cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + '] [data-id=available]').eq(index / 2).then((element) => {
                        const tempAvail = element.text()
                        var available = tempAvail.split("+")
                        available = available[0].trim()
                        expect(available).to.equal(temp.Buy.availability)
                    })
                }

            })
        })
    })

})

Then('I verified the price', () => {


    cy.readFile(filename).then(temp => {
        cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + ']').then(() => {
            cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + '] [data-id=itemsInCart] [data-id=itemNumber]').each(($el, index, $list) => {
                const tempText = $el.text()
                var itemNumber = tempText.split(":")
                itemNumber = itemNumber[1].trim()
                if (itemNumber === temp.Buy.item_id) {
                    cy.get('[id=warehouse-' + temp.Buy.WareHouse.replace(" ", "") + '] [data-id=listPrice]').eq(index / 2).then((element) => {
                        const tempPrice = element.text()
                        var price = tempPrice.split("$")
                        price = price[1].trim()
                        expect(price).to.equal(temp.Buy.price)
                    })
                }

            })
        })
    })
})