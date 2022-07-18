class CartPage
{
  getCheckoutButton(){
    return cy.get(':nth-child(4) > :nth-child(5) > .btn')
  } 
  getProductsAmount(){
    return cy.get('tr td:nth-child(4) strong')
  }
  getTotalAmount(){
    return cy.get('h3 strong')
  }
  getOffersTab(){
    return cy.get(':nth-child(3) > .MuiTab-wrapper > .MuiBadge-root > .margin-bottom-0')
  }
}
export default CartPage;