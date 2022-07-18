class ProductPage
{
  getProductName(){
    return cy.get('h4.card-title')
  }
  getAddButton(){
    return cy.get('button.btn.btn-info')
  }
  getCheckoutButton(){
    return cy.get('#navbarResponsive > .navbar-nav > .nav-item > .nav-link')
  }     
}
export default ProductPage;