/// <reference types="Cypress" />
var ls = require('local-storage');
import PhoenXStockListpage from '../../../../support/pageObjects/PhoenXStockListPage'
import { And, Before, Then, When } from "cypress-cucumber-preprocessor/steps";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const StockListpage = new PhoenXStockListpage()

let localStorageDetails = 'E:/node/CypressAutomation/cypress/fixtures/phoenXLocalStorage.json'
let filename = 'E:/node/CypressAutomation/cypress/fixtures/phoenXdetails.json';

Before({tags:"@SetDetails"},() => {
    cy.readFile(localStorageDetails).then(temp => {
        let details = temp
        cy.visit('https://wsc.phonexcorp.com/stock', {
            onBeforeLoad: function (window) {
                for (var key in details) {
                    window.localStorage.setItem(key, details[key])
                }
            }
        })
    })
})

Given('I log in to the Ecommerce page', () => {
    cy.wait(10000)
})

When('I add a random item to Cart which is not in Cart', () => {
    StockListpage.getAllItems().then(listing => {
        const randomNumber = getRandomInt(1, listing.length - 2);
        StockListpage.getAllItemsDropDownButtons().eq(randomNumber).click()

        StockListpage.getAllItemsDropDownButtons().eq(randomNumber).then(response => {
            cy.readFile(filename).then(temp => {
                temp.Buy = {}
                temp.Buy.WareHouse = response.text()
                cy.writeFile(filename, temp)
            })
        })
        StockListpage.getAllItems().eq(randomNumber + 1).then((element) => {

            const textcontain = element.text()
            if (textcontain.includes("Buy")) {
                cy.wrap(element).contains("Buy").click()
            }

            else {
                cy.wrap(element).contains("IN CART").click()
                StockListpage.getRemoveFromCart().click()
                cy.wrap(element).contains("Buy").click()
            }
        })
    })
})

And('Saved the item details to the fixture file', () => {
    cy.readFile(filename).then(temp => {
        StockListpage.getItemsName().then(response => {
            temp.Buy.item_name = response.text()
        })
        StockListpage.getItemdesc().then(response => {
            temp.Buy.description = response.text()
        })
        StockListpage.getItemID().then(response => {
            const id = response.text()
            var res = id.split("[")
            res = res[1].trim()
            res = res.split("]")
            res = res[0].trim()
            temp.Buy.item_id = res
        })
        StockListpage.getItemAvailability().then(response => {
            const id = response.text()
            var res = id.split("+")
            res = res[0].trim()
            temp.Buy.availability = res
        })
        StockListpage.getItemPrice().then(response => {
            const id = response.text()
            var res = id.split("$")
            res = res[1].trim()
            temp.Buy.price = res
        })
        cy.writeFile(filename, temp)

    })

})

Then('Added it to the Cart', () => {
    StockListpage.getAddtoCartButton().click()
})