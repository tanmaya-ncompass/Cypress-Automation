/// <reference types="Cypress" />
describe('My Fourth Test Suite', function () {
    it('My Fourth Test Case', function () {
        let filename = 'E:/node/CypressAutomation/cypress/fixtures/details4.json';
        cy.visit("https://www.demoblaze.com/")
        cy.wait(4000)
        cy.get('.list-group-item').contains('Phones').click()
        cy.get('.hrefch').eq(0).click()
         
        cy.get('.name').then(response =>{
            cy.readFile(filename).then(temp =>{
                temp = {}
                temp.name = response.text()
                cy.log(temp)
                cy.writeFile(filename, temp)

            })
            //cy.writeFile(filename, { name: response.text()})
            // cy.log(cy.get('.name').next().next())
        })
        cy.get('.price-container').then(response =>{
            cy.readFile(filename).then(temp =>{
               
               temp.price = response.text()
               cy.log(temp.name+".....")
                cy.writeFile(filename, temp)
            })
            
        })
        
        cy.get('.col-sm-12 .btn').contains('Add to cart').click()
        cy.get('#cartur').click()

        cy.readFile(filename).then(product =>{
            cy.get('.success > :nth-child(2)').should('have.text', product.name)
            cy.get('.success > :nth-child(3)').then(element =>{
               let a= element.text()
               expect(product.price).to.include(a)
            })
        })

    
        // cy.get('.name').then((product) => {
        //     cy.writeFile('cypress/fixtures/details4.json', product.name)
        //   })

            // cy.writeFile('cypress/fixtures/details4.json', response.body)
            // cy.log(response.body);
          
          // cy.get('.col-lg-1 > .btn').click()



        // cy.fixture('details').then(function (details) {
           
        // })
       
        // cy.get('#name').type(this.details.name)
            
    })
})