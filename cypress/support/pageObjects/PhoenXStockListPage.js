class PhoenXStockListPage {
  getAllItems() {
    return cy.get(`[data-id="itemGroups"]`)
  }
  getAllItemsDropDownButtons() {
    return cy.get(`[data-id="itemGroups"] > button`)
  }
  getRemoveFromCart() {
    return cy.get('.text-right.margin-bottom-1 > .MuiButtonBase-root > .MuiButton-label')
  }
  getItemsName() {
    return cy.get('.MuiDialogContent-root > h4')
  }
  getItemdesc() {
    return cy.get('.item-desc-header')
  }
  getItemID() {
    return cy.get('.MuiDialogContent-root > .text-muted')
  }
  getItemAvailability() {
    return cy.get('.align-stretch > :nth-child(1) > p')
  }
  getItemPrice() {
    return cy.get('.align-stretch > :nth-child(2) > p')
  }
  getAddtoCartButton() {
    return cy.get(':nth-child(7) > .MuiButton-contained > .MuiButton-label')
  }
  getMakeAnOfferButton() {
    return cy.get('.margin-bottom-1 > .MuiButtonBase-root > .MuiButton-label')
  }
  getCartButton() {
    return cy.get('.MuiBadge-root > .MuiSvgIcon-root > path')
  }
  getOfferPriceBox() {
    return cy.get('#offerPrice')
  }
}

export default PhoenXStockListPage