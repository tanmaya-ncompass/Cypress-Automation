Feature:PhoenX StockList validation

    application Regression
    @Regression
    Scenario: WSC products delivery
        Given I log in to the Ecommerce page
        When I add a random item which is in the Cart
        And Saved the item details to the fixture file
        Then Added it to the Cart