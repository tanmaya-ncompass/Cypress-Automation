/// <reference types="Cypress" />
import HomePage from '../../../../support/pageObjects/HomePage'
import ProductPage from '../../../../support/pageObjects/ProductPage'
import CartPage from '../../../../support/pageObjects/CartPage'
import PlaceOrderPage from '../../../../support/pageObjects/PlaceOrderPage'
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

let name, email, password, gender;

const homePage = new HomePage()
const productPage = new ProductPage()
const cartPage = new CartPage()
const placeOrderPage = new PlaceOrderPage()

Given('I open Ecommerce page', () => {
    cy.visit(Cypress.env('url') + "/angularpractice/")
    cy.pause()
})

When('I add items to Cart', function () {
    cy.pause()
    homePage.getShopButton().click()

    this.data.productName.forEach(function (product) {
        cy.selectProduct(product)

    });

    productPage.getCheckoutButton().click()
})
And('Validate the total prices', () => {
    cy.pause()
    var sum = 0
    cartPage.getProductsAmount().each(($el, index, $list) => {
        const amount = $el.text()
        var res = amount.split(" ")
        res = res[1].trim()
        cy.log(res)
        sum = sum + Number(res)
    })
    cartPage.getTotalAmount().then(function (element) {
        const amount = element.text()
        var res = amount.split(" ")
        var total = res[1].trim()
        expect(Number(total)).to.equal(sum)
    })

    cartPage.getCheckoutButton().click()
})
Then('Select the country submit and verify Thankyou', function () {
    cy.pause()
    placeOrderPage.getCountryBox().type(this.data.country).debug()
    placeOrderPage.getCountrySuggestion().each(($el, index, $list) => {
        const textcontain = $el.text()

        if (textcontain.includes(this.data.country)) {
            cy.wrap($el).contains(this.data.country).click({ force: true })
        }
    })
    placeOrderPage.getCountryBox().should('have.value', this.data.country)
    placeOrderPage.getCheckBox().click({ force: true })
    placeOrderPage.getPurchaseButton().click()
    placeOrderPage.getSuccessMessage().then(element => {
        let message = element.text()
        expect(message.includes('Success! Thank you!')).to.be.true
    })
})


When('I fill the form details', function (dataTable) {
    name=dataTable.rawTable[1][0]
    email=dataTable.rawTable[1][1]
    password=dataTable.rawTable[1][2]
    gender=dataTable.rawTable[1][3]

    homePage.getNameEditBox().type(name)
    homePage.getEmailEditBox().type(email)
    homePage.getPasswordEditBox().type(password)
    homePage.getCheckBox().check()
    homePage.getGender().select(gender)
    cy.pause()
})

Then('Validate the forms behaviour', function () {
    homePage.getTwoWayDataBinding().should('have.value', name)
    homePage.getNameEditBox().should('have.attr', 'minlength', '2')
    homePage.getEntrepreneur().should('be.disabled')
})

And('Select the Shop Page', function () {
    homePage.getShopButton().click()
})