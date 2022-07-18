/// <reference types="Cypress" />

describe('My 10th test suite', function () {

    it('My first test case', function () {

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [{
                        "book_name": "RestAssured with Java",
                        "isbn": "RSU",
                        "aisle": "2301"}]
            }).as('bookretrievals')
            cy.get('.btn-primary').click()
            cy.wait('@bookretrievals').should(({request,response}) => {
                cy.get('tr').should('have.length',response.body.length+1)
                response.body.length
            })
            cy.get('p').should('have.text','Oops only 1 Book available')




    })
})