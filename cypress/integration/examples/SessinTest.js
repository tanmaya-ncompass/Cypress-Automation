/// <reference types="Cypress" />
const neatCSV = require('neat-csv')
let productName
describe('JWT Session', () => {

    it('logged in through local storage', async function () {
        cy.LoginAPI().then(function(){
            cy.visit("https://www.rahulshettyacademy.com/client", {
                onBeforeLoad : function(window){
                    window.localStorage.setItem('token',Cypress.env('token'))
                }
            })
        })

        cy.get(".card-body b").eq(0).then(function(element){
            productName=element.text()
        })
        cy.get('.card-body > button:last-of-type').eq(0).click()
        cy.get("[routerlink*='cart']").click()
        cy.contains("Checkout").click()
        cy.get("[placeholder*='Country']").type("India"+"{enter}")
        
        cy.get(".ta-results button ").each(($el,index,$list) => 
        {
            if($el.text() === "India") {
                cy.log("++++++++++++")
                //cy.wrap($el).click()
            }
        })
        cy.get(".action__submit").click()
        
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_tanmayadash97.csv")
        .then(async function(text){
            const csv = await neatCSV(text)
            console.log(csv)
            const actualProductCSV=csv[0]["Product Name"]
            expect(productName).to.equal(actualProductCSV)
        })
        
    })
})