/// <reference types="Cypress" />
import PhoenXStockListpage from '../../../../support/pageObjects/PhoenXStockListPage'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
let filename = 'E:/node/CypressAutomation/cypress/fixtures/phoenXdetails.json';

const StockListpage = new PhoenXStockListpage()

Given('I log in to the Ecommerce page', () => {

    cy.visit(Cypress.env('url'))
    cy.PhoenXLogin()
    cy.wait(10000)
})

When('I add a random item which is in the Cart', () => {
    let temp = {}
    StockListpage.getAllItems().then(listing => {
        const randomNumber = getRandomInt(1, listing.length - 2);
        // const randomNumber= 11
        StockListpage.getAllItemsDropDownButtons().eq(randomNumber).click()

        StockListpage.getAllItemsDropDownButtons().eq(randomNumber).then(response => {
            cy.readFile(filename).then(temp => {
                temp.WareHouse = response.text()
                cy.writeFile(filename, temp)
            })
        })
        StockListpage.getAllItems().eq(randomNumber + 1).then((element) => {

            const textcontain = element.text()
            if (textcontain.includes("IN CART")) {

                cy.wrap(element).contains("IN CART").click()
                StockListpage.getRemoveFromCart().click()
                cy.wrap(element).contains("Buy").click()
                StockListpage.getMakeAnOfferButton().click()
                StockListpage.getItemPrice().then(response => {
                    const id = response.text()
                    var res = id.split("$")
                    res = res[1].trim()
                    var offerPrice = res - 5
                    StockListpage.getOfferPriceBox().clear().type(offerPrice)
                    cy.readFile(filename).then(temp => {
                        temp.Offerprice = String(offerPrice)
                        cy.log(offerPrice)
                        cy.writeFile(filename, temp)
                    })

                })
            }
            else {
                cy.log("This feature file will only add products which is already in cart")
            }
        })
    })
})

And('Saved the item details to the fixture file', () => {
    cy.readFile(filename).then(temp => {
        StockListpage.getItemsName().then(response => {
            temp.item_name = response.text()
            cy.log(response.text())
        })
        StockListpage.getItemdesc().then(response => {
            temp.description = response.text()
        })
        StockListpage.getItemID().then(response => {
            const id = response.text()
            var res = id.split("[")
            res = res[1].trim()
            res = res.split("]")
            res = res[0].trim()
            temp.item_id = res
        })
        StockListpage.getItemAvailability().then(response => {
            const id = response.text()
            var res = id.split("+")
            res = res[0].trim()
            temp.availability = res
        })
        StockListpage.getItemPrice().then(response => {
            const id = response.text()
            var res = id.split("$")
            res = res[1].trim()
            temp.price = res
        })
        cy.writeFile(filename, temp)
    })

})

Then('Added it to the Cart', () => {
    StockListpage.getAddtoCartButton().click()
})