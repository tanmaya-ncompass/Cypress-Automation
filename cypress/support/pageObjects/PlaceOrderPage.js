class PlaceOrderPage
{
  getCountryBox(){
    return  cy.get('#country')
  }
  getCountrySuggestion(){
    return  cy.get('div.suggestions')
  }
  
  getCheckBox(){
    return  cy.get('.checkbox > label')
  }
  getPurchaseButton(){
    return  cy.get('.ng-untouched > .btn')
  }
  getSuccessMessage(){
    return  cy.get('.alert') 
  }
  
}
export default PlaceOrderPage;