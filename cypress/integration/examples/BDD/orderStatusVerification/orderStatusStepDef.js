/// <reference types="Cypress" />

import PhoenXStockListpage from '../../../../support/pageObjects/PhoenXStockListPage'

let filename = 'E:/node/CypressAutomation/cypress/fixtures/phoenXdetails.json';

const StockListpage = new PhoenXStockListpage()
let orderNumber

Given('I opened order page', () => {
    cy.visit(Cypress.env('url'))
    cy.PhoenXLogin()
    cy.wait(10000)
    cy.get('.px-menu-mobile > :nth-child(1) > .link > .MuiSvgIcon-root > path').click({force:true})
    cy.get('div.px-menu-desk > :nth-child(3) > .show > .cell').click()

})

When('I verified the order number from fixture file', () => {
    cy.readFile(filename).then(temp => {

        // cy.get('[data-id="refOrderNumberOrPhonexOrderNumber"]').eq(2).then((el) => {
            
        //     let orderNumberText = el.text()
        //     let orderNumber = orderNumberText.split(" ")
        //     orderNumber = orderNumber[1].trim()
        //     cy.log(orderNumber+"pppppppppppppppppp")
        // })
        
        cy.get('[data-id="refOrderNumberOrPhonexOrderNumber"]').each(($li,index,$list) => {
            let orderNumberText = $li.text()
            let orderNumber = orderNumberText.split(" ")
            orderNumber = orderNumber[1].trim()
            
            
            if(orderNumber === "Paid"){
                cy.log(orderNumber+"pppppppppppppppppp")
                expect(orderNumber).to.equal(temp.Order.orderNumber)
                cy.get('[data-id="fulfillmentStatus"]').should('contain' ,temp.Order.fulfilment )
                cy.get('[data-id="paymentStatus"]').should('contain' , temp.Order.payment)
            }
            else{}
        })
                
    })
})

And('I verified the order fullfilment status from fixture file', () => {
    // cy.get('.link > .MuiSvgIcon-root').click()
    // cy.wait(4000)
    // cy.get(':nth-child(3) > .show > .cell').click()

    // cy.get('.px-table > :nth-child(9)').then((element) => {
    //     let temp = element.text()
    //     orderNumber = temp.split(":")
    //     orderNumber = orderNumber[1].trim()
    // })

})

And('I verified the order Payment status', () => {

    // cy.get('.px-table > :nth-child(9)').click()
    // cy.get('h2').contains("Order").then((element) => {
    //     let tempText = element.text()
    //     let orderTxt = tempText.split(" ")
    //     orderTxt = orderTxt[1].trim()
    //     expect(orderTxt).to.equal(orderNumber)
    // })
    // cy.readFile(filename).then(temp => {
    //     temp.Order = {}
    //     temp.Order.orderNumber = orderNumber

    //     cy.get('.margin-right-1').should('contain' , 'Awaiting Payment')
    //     cy.get('[data-id="paymentStatus"]').should('contain' , 'Unpaid')

    //     cy.get('.margin-right-1').then((element) => {
    //         temp.Order.fulfilment = element.text()
    //     })
    //     cy.get('[data-id="paymentStatus"]').then((element) => {
    //         temp.Order.payment = element.text()
    //     })
    //     cy.writeFile(filename, temp)
    // })
})

