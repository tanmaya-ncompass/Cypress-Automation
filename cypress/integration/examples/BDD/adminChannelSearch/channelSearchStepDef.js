/// <reference types="Cypress" />

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var randomNumber,itemNumber,availability,randomStockList,randomchannel;
Given('I opened channel page in Admin login', () => {
    cy.visit('https://wscadmin.phonexcorp.com/')
    cy.PhoenXAdminLogin()
    cy.wait(10000)
    cy.get('li > .link > .MuiSvgIcon-root > path').click({ force: true })
    cy.get(':nth-child(5) > .border-bottom > .cell > span').click()
    cy.viewport(1600, 990)
})

When('I randomly select an item number and searched it', () => {
    
    cy.get('.MuiSelect-root').click({ force: true })
    cy.get('.MuiPaper-root > .MuiList-root > [tabindex="-1"]').click()
    randomNumber = getRandomInt(0, 25)
    cy.get('[col-id="itemNumber"] .ag-cell-value').eq(randomNumber).then((el) => {
        itemNumber = el.text()
        cy.log(itemNumber)
        cy.get('.px-search-text > .MuiInputBase-root > .MuiInputBase-input').clear().type(itemNumber)
    })
})

And('I verified the search result item number', () => {
    cy.get('[col-id="itemNumber"] .ag-cell-value').each(($li, index, $list) => {
        let itemSearchNum = $li.text()
        if (itemSearchNum == itemNumber)
            expect(itemSearchNum).to.equal(itemNumber)
    })
    cy.wait(3000)
})

Then('I cleared the search box', () => {
    cy.get('[data-id="clearFilter"] > .MuiButton-label').click()
})





When('I randomly select an item number and store its total availability', () => {
    cy.get('.MuiSelect-root').click({ force: true })
    cy.get('.MuiPaper-root > .MuiList-root > [tabindex="-1"]').click()
    randomNumber = getRandomInt(0, 25)
    cy.get('[col-id="itemNumber"] .ag-cell-value').eq(randomNumber).then((el) => {
        itemNumber = el.text()
        cy.log(itemNumber)
    })
    cy.get('[col-id="totalQuantityAvailable"] .ag-cell-value').eq(randomNumber).then((el) => {
        availability = el.text()
        cy.log(availability)
    })
    
})

When('I clicked on edit button of that item', () => {
    cy.get('[data-id="editChannel"]').eq(randomNumber).click()
})

And('I tried put random number in stock list and not assigned field', () => {
    randomStockList = getRandomInt(0,availability)
    cy.get('[name="Stock List"]').clear().type(randomStockList)
    cy.get('[name="Not Assigned"]').clear().type(availability-randomStockList)
})

And('I verified all the positive and negative testing', () => {
    cy.get('[name="Stock List"]').clear().type(randomStockList)
    cy.get('[name="Not Assigned"]').clear().type(availability-randomStockList+1)
    cy.get('.MuiButton-contained > .MuiButton-label').click()
    cy.get('p.MuiTypography-root').eq(0).should('contain.text',Number(availability)+1)
    cy.get('p.MuiTypography-root').eq(1).should('contain.text',availability)
    cy.get('p.MuiTypography-root').eq(2).should('contain.text',Number(availability)-Number(availability)+1)
    cy.get('p.MuiTypography-root').eq(3).should('contain.text',"Sum of channel quantities must equal Current Available Total")

    cy.get('[name="Stock List"]').clear().type(randomStockList)
    cy.get('[name="Not Assigned"]').clear().type(availability-randomStockList-1)
    cy.get('.MuiButton-contained > .MuiButton-label').click()
    cy.get('p.MuiTypography-root').eq(0).should('contain.text',Number(availability)-1)
    cy.get('p.MuiTypography-root').eq(1).should('contain.text',availability)
    cy.get('p.MuiTypography-root').eq(2).should('contain.text',Number(availability)-Number(availability)+1)
    cy.get('p.MuiTypography-root').eq(3).should('contain.text',"Sum of channel quantities must equal Current Available Total")

    cy.get('[name="Stock List"]').clear().type(randomStockList)
    cy.get('[name="Not Assigned"]').clear().type(availability-randomStockList)
})


And('I changed the channel of the item randomly', () => {

    //cy.get('#defaultChannel').click()
    //cy.get('#defaultChannel').eq(1).click()
    cy.get('#defaultChannel').then((el)=> {
        randomchannel = el.val()
    })
//     cy.get(`#defaultChannel> option`).then(listing => {        
//     const randomNum = getRandomInt(0, listing.length-1)
//     cy.get(`#defaultChannel> option`).eq(randomNum).then(($select) => {              
//       const text = $select.text()
//       cy.get(`#defaultChannel> option`).select(text)
//     })
//   })
    // cy.pause()
    // cy.get('#defaultChannel').eq(0).click()
    // cy.pause()
    // cy.get('#defaultChannel').eq(1).click()
    cy.get('.MuiButton-contained > .MuiButton-label').click()
    cy.wait(5000)
})


Then('I verified the total availability, stock list, not assigned and default channel under the particular channel tab', () => {
    cy.get('.MuiSelect-root').click()
    cy.get('.MuiList-root > .Mui-selected').click()
    
    cy.get('.px-search-text > .MuiInputBase-root > .MuiInputBase-input').clear().type(itemNumber)
    cy.wait(3000)
    cy.get('[col-id="itemNumber"] .ag-cell-value').each(($li, index, $list) => {
        let itemSearchNum = $li.text()
        if (itemSearchNum == itemNumber){
            expect(itemSearchNum).to.equal(itemNumber)
        cy.get('[aria-colindex="7"] > .ag-cell-wrapper > .ag-cell-value').should('contain.text',availability)
        cy.get('[aria-colindex="8"] > .ag-cell-wrapper > .ag-cell-value').should('contain.text',randomStockList)
        cy.get('[aria-colindex="9"] > .ag-cell-wrapper > .ag-cell-value').should('contain.text',availability-randomStockList)
        cy.get('[aria-colindex="10"] > .ag-cell-wrapper > .ag-cell-value').should('contain.text',randomchannel)}
            
    })
        
    
})