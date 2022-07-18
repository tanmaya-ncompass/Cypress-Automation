/// <reference types="Cypress" />
import PhoenXStockListpage from '../../../../support/pageObjects/PhoenXStockListPage'
import CartPage from '../../../../support/pageObjects/CartPage'

const StockListpage = new PhoenXStockListpage()
const Cartpage = new CartPage()
let filename = 'E:/node/CypressAutomation/cypress/fixtures/phoenXdetails.json';

Given('I opened Offer Awaiting tab in Cart page', () => {
    cy.visit('https://wsc.phonexcorp.com/')
    cy.PhoenXLogin()
    cy.wait(10000)
    StockListpage.getCartButton().click()
    Cartpage.getOffersTab().click()

})

When('I Verified the warehouse and item number for Offer option', () => {
    cy.readFile(filename).then(temp => {
        cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + ']').then(() => {
            cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + '] [data-id=itemsInCart] [data-id=itemNumber]').each(($el, index, $list) => {
                const tempText = $el.text()
                var itemNumber = tempText.split(":")
                itemNumber = itemNumber[1].trim()
                if (itemNumber === temp.item_id) {
                    expect(itemNumber).to.equal(temp.item_id)
                }

            })
        })
    })

})

And('I Verified the availability and offer price', () => {
    cy.readFile(filename).then(temp => {
        cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + ']').then(() => {
            cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + '] [data-id=itemsInCart] [data-id=itemNumber]').each(($el, index, $list) => {
                const tempText = $el.text()
                var itemNumber = tempText.split(":")
                itemNumber = itemNumber[1].trim()
                if (itemNumber === temp.item_id) {
                    cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + '] [data-id=available]').eq(index / 2).then((element) => {
                        const tempAvail = element.text()
                        var available = tempAvail.split("+")
                        available = available[0].trim()
                        expect(available).to.equal(temp.availability)
                    })
                    cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + '] [data-id=yourOffer]').eq(index / 2).then((element) => {
                        const tempOffer = element.text()
                        var OfferPrice = tempOffer.split("@")
                        OfferPrice = OfferPrice[1].trim()
                        expect(OfferPrice).to.equal(temp.Offerprice)
                    })
                }

            })
        })
    })

})

Then('I verified the price', () => {


    cy.readFile(filename).then(temp => {
        cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + ']').then(() => {
            cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + '] [data-id=itemsInCart] [data-id=itemNumber]').each(($el, index, $list) => {
                const tempText = $el.text()
                var itemNumber = tempText.split(":")
                itemNumber = itemNumber[1].trim()
                if (itemNumber === temp.item_id) {
                    cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + '] [data-id=listPrice]').eq(index / 2).then((element) => {
                        const tempPrice = element.text()
                        var price = tempPrice.split("$")
                        price = price[1].trim()
                        expect(price).to.equal(temp.price)
                    })
                }

            })
        })
    })
})