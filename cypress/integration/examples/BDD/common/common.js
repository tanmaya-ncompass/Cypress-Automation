import { And, Before, Then, When } from "cypress-cucumber-preprocessor/steps";
Before({tags:"@SetDetails"}, () => {
    
    let localStorageDetails = 'E:/node/CypressAutomation/cypress/fixtures/phoenXLocalStorage.json'

    // let keys = Object.keys(localStorage),
    //     i = keys.length;
    cy.readFile(localStorageDetails).then(temp => {
        let details = temp
        cy.visit('https://wsc.phonexcorp.com/stock', {
            onBeforeLoad: function (window) {
                for (var key in details) {
                    window.localStorage.setItem(key, details[key])
                }
            }
        })
    })

})