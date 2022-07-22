/// <reference types="Cypress" />
let filename = 'E:/node/CypressAutomation/cypress/fixtures/phoenXdetails.json';

Given('I opened Admin page and Verified the most recent item', () => {
    cy.visit('https://wscadmin.phonexcorp.com/')
    cy.PhoenXAdminLogin()
    cy.wait(10000)
})

When('I placed the order', () => {

    cy.get('li > .link > .MuiSvgIcon-root > path').click({force: true} )
    cy.get(':nth-child(3) > .MuiButtonBase-root > .cell > span').click()
    cy.wait(5000)
    cy.viewport(1600, 990)
    cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('right', { duration: 2000 })
    cy.readFile(filename).then(temp => {
    cy.get('[role="row"] [col-id="phonexOrderNumber"] .ag-react-container').each(($li,index,$list) => {
        let orderText = $li.eq(index).text()
        cy.log(orderText)
            cy.log(index)
           if(orderText = temp.Order.orderNumber){
            cy.log(orderText)
            cy.log(index)
            
            cy.get('[col-id="fulfillmentStatus"] .ag-cell-value').eq(index).should('contain.text' , temp.Order.fulfilment)
            cy.get('[col-id="paymentStatus"] .ag-cell-value').eq(index).should('contain', temp.Order.payment)
            cy.wrap($li).click({force: true})
            cy.wait(2000)
            cy.get('[role="row"] [col-id="phonexOrderNumber"] .ag-react-container').eq(1).click()
            return false
           }
         })
    })
  
})

And('I opened the orders page', () => {
    cy.get('[col-id="orderedQuantity"] span.ag-cell-value').then((element) => {
        let quantity = element.text()
        cy.log(quantity)
        cy.get('.ag-react-container > [data-id="edit"] > .MuiButton-label').click()
        cy.get('[col-id="shippedQuantity"] .MuiInputBase-input').clear().type(quantity)
    })
    cy.get('[data-id="done"] > .MuiButton-label').click()
    cy.get('.border-top > .MuiButton-contained > .MuiButton-label').click()
    cy.get('[data-id="fulfillmentStatus"]').click()
    cy.get(':nth-child(6) > .MuiFormControlLabel-root').click()
    cy.get('.MuiDialogActions-root > .MuiButton-contained > .MuiButton-label').click()
    cy.get(':nth-child(9) > .MuiButtonBase-root > .MuiButton-label').click()
    cy.get('.MuiDialogActions-root > .MuiButton-contained > .MuiButton-label').click()
    cy.wait(5000)
    cy.get('.px-background-badge_1').click()
    cy.get('.MuiDialogContent-root > .MuiFormGroup-root > :nth-child(2) > .MuiFormControlLabel-root > .MuiTypography-root').click()
    cy.get('.MuiDialogActions-root > .MuiButton-contained > .MuiButton-label').click()
    cy.wait(4000)
})

Then('I verified the order number and order status', () => {
    cy.readFile(filename).then(temp => {
        
        //cy.get('[data-id="fulfillmentStatus"]').should('contain' , 'Awaiting Payment')
        //cy.get('[data-id="paymentStatus"]').should('contain' , 'Unpaid')

        cy.get('[data-id="fulfillmentStatus"]').then((element) => {
            temp.Order.fulfilment = element.text()
        })
        cy.wait(5000)
        cy.get('[data-id="paymentStatus"]').then((element) => {
            temp.Order.payment = element.text()
        })
        cy.writeFile(filename, temp)
    })
})