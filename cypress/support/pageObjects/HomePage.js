class HomePage
{
    getNameEditBox(){
      return  cy.get(':nth-child(1) > .form-control')
    }
    getEmailEditBox(){
      return  cy.get(':nth-child(2) > .form-control')
    }
    getPasswordEditBox(){
      return  cy.get(':nth-child(3) > .form-control')
    }
    getGender(){
      return  cy.get('#exampleFormControlSelect1')
    }
    getCheckBox(){
        return  cy.get('#exampleCheck1')
      }
    
    getTwoWayDataBinding(){
      return  cy.get(':nth-child(4) > .ng-untouched')
    }
    getEntrepreneur(){
      return  cy.get('#inlineRadio3')
    }
    getShopButton(){
      return  cy.get(':nth-child(2) > .nav-link')
    }
       
}
export default HomePage;