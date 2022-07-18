/// <reference types="Cypress" />
describe('My 10th Test Suite', function () {
    let filename = 'E:/node/CypressAutomation/cypress/fixtures/phoenXdetails.json';

    it('My 1st Test Case', function () {
        cy.visit(Cypress.env('url'))

        cy.PhoenXLogin()
        cy.wait(10000)
        //cy.get('[data-id="itemGroups"] > button').eq(0).click()
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let temp = {}
        cy.get(`[data-id="itemGroups"]`).then(listing => {
            const randomNumber = getRandomInt(1, listing.length - 2);
            cy.get(`[data-id="itemGroups"] > button`).eq(randomNumber).click()

            cy.get(`[data-id="itemGroups"] > button`).eq(randomNumber).then(response => {
                temp.WareHouse = response.text()
            })
            cy.get(`[data-id="itemGroups"]`).eq(randomNumber + 1).then((element) => {

                const textcontain = element.text()
                cy.log(textcontain)
                if (textcontain.includes("Buy")) { }

                else {
                    cy.wrap(element).contains("IN CART").click()
                    cy.get('.text-right.margin-bottom-1 > .MuiButtonBase-root > .MuiButton-label').click()
                }

                cy.wrap(element).contains("Buy").click()

            })
            // cy.get('[data-id="itemGroups"] > button').should('have.length', 24).then((element) => {
            //     const items = element.toArray()
            //     return Cypress._.sample(items)
            // }).then(() => {}).click()
            // cy.get('')
        })
        cy.readFile(filename).then(temp => {
            cy.get('.MuiDialogContent-root > h4').then(response => {
                temp.item_name = response.text()
            })
            cy.get('.item-desc-header').then(response => {
                temp.description = response.text()
            })
            cy.get('.MuiDialogContent-root > .text-muted').then(response => {
                const id = response.text()
                var res = id.split("[")
                res = res[1].trim()
                res = res.split("]")
                res = res[0].trim()
                temp.item_id = res
            })
            cy.get('.align-stretch > :nth-child(1) > p').then(response => {
                const id = response.text()
                var res = id.split("+")
                res = res[0].trim()
                temp.availability = res
            })
            cy.get('.align-stretch > :nth-child(2) > p').then(response => {
                const id = response.text()
                var res = id.split("$")
                res = res[1].trim()
                temp.price = res
            })

            cy.writeFile(filename, temp)
        })

        cy.get(':nth-child(7) > .MuiButton-contained > .MuiButton-label').click()
        cy.get('.MuiBadge-root > .MuiSvgIcon-root > path').click()

        cy.readFile(filename).then(temp => {
            cy.get('[id=warehouse-'+ temp.WareHouse +']').then(() => {
                cy.get('[id=warehouse-'+ temp.WareHouse +'] [data-id=itemsInCart] [data-id=itemNumber]').each(($el, index, $list) => {
                    const tempText = $el.text()
                    var itemNumber = tempText.split(":")
                    itemNumber = itemNumber[1].trim()
                    if (itemNumber === temp.item_id) {
                        cy.get('[id=warehouse-' + temp.WareHouse + '] [data-id=listPrice]').eq(index / 2).then((element) => {
                            const tempPrice = element.text()
                            var price = tempPrice.split("$")
                            price = price[1].trim()
                            expect(price).to.equal(temp.price)
                        })
                        cy.get('[id=warehouse-' + temp.WareHouse + '] [data-id=available]').eq(index / 2).then((element) => {
                            const tempAvail = element.text()
                            var available = tempAvail.split("+")
                            available = available[0].trim()
                            expect(available).to.equal(temp.availability)
                        })

                    }

                })
            })
        })
    })
})