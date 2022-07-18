//const temp = require('../../fixtures/phoenXdetails.json')
class PhoenXCartPage
{
    
    getWarehouse(){
        return  cy.get('[id=warehouse-' + temp.WareHouse.replace(" ", "") + ']')
      }
    getItemdesc(){
        return  cy.get('.item-desc-header')
      }
    getItemID(){
        return  cy.get('.MuiDialogContent-root > .text-muted')
      }
    getItemAvailability(){
        return  cy.get('.align-stretch > :nth-child(1) > p')
      }
    getItemPrice(){
        return  cy.get('.align-stretch > :nth-child(2) > p')
      }
      
}
export default PhoenXCartPage