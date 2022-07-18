/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage'
import ProductPage from '../../support/pageObjects/ProductPage'
import CartPage from '../../support/pageObjects/CartPage'
import PlaceOrderPage from '../../support/pageObjects/PlaceOrderPage'

describe('My 9th Test Suite', function () {

    before(function(){
        let filename ='details9.json'
        cy.fixture(filename).then(function(data){
            this.data=data  
        })

    })

    it('My 9th Test Case', function () {
        Cypress.config('defaultCommandTimeout',8000)
        const homePage=new HomePage()
        const productPage =new ProductPage()
        const cartPage =new CartPage() 
        const placeOrderPage=new PlaceOrderPage()

        cy.visit(Cypress.env('url')+"/angularpractice/")
       
        homePage.getNameEditBox().type(this.data.name)
        homePage.getEmailEditBox().type(this.data.email)
        homePage.getPasswordEditBox().type(this.data.password)
        homePage.getCheckBox().check()
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value',this.data.name)
        homePage.getNameEditBox().should('have.attr','minlength','2')
        homePage.getEntrepreneur().should('be.disabled')
        homePage.getShopButton().click()


        this.data.productName.forEach(function(product){
            cy.selectProduct(product)
            
        });

        productPage.getCheckoutButton().click()
        var sum = 0
        cartPage.getProductsAmount().each(($el, index, $list) => {
            const amount=$el.text()
            var res = amount.split(" ")
            res = res[1].trim()
            cy.log(res)
            sum=sum+ Number(res)   
        })
        cartPage.getTotalAmount().then(function(element){
            const amount=element.text()
            var res = amount.split(" ")
            var total = res[1].trim()
            expect(Number(total)).to.equal(sum)
        })
        cy.pause()
        cartPage.getCheckoutButton().click()

        placeOrderPage.getCountryBox().type(this.data.country).debug()
        placeOrderPage.getCountrySuggestion().each(($el, index, $list) => {
            const textcontain = $el.text()

            if(textcontain.includes(this.data.country)){
                cy.wrap($el).contains(this.data.country).click({force: true})
            }
            })
            placeOrderPage.getCountryBox().should('have.value',this.data.country)
            placeOrderPage.getCheckBox().click({force: true})
            placeOrderPage.getPurchaseButton().click()
            placeOrderPage.getSuccessMessage().then(element => {
              let message= element.text()
               expect(message.includes('Success! Thank you!')).to.be.true
            })
        })
})