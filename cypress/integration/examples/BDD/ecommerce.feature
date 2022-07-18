Feature: End to end Ecommerce validation 

    application Regression
    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items to Cart
    And Validate the total prices
    Then Select the country submit and verify Thankyou

    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce page
    When I fill the form details
    |name           |email                     |password      |gender   |
    |Tanmaya Dash   |tanmayadash97@gmail.com   |tanmayadash   |Male     |
    Then Validate the forms behaviour
    And Select the Shop Page