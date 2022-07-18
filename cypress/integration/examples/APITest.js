/// <reference types="Cypress" />

describe('My 1st API test suite', function () {

    it('My first API test case', function () {

        cy.request('POST' , 'http://216.10.245.166/Library/Addbook.php',{

            "name":"Learn Appium Automation with Java",
            "isbn":"bcgfjgtd",
            "aisle":"225587",
            "author":"John foe"
            }).then(function(response){
                expect(response.body).to.have.property("Msg","successfully added")
            })





    })
})