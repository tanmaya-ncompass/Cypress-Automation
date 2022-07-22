Feature:PhoenX Cart Page Validation

    application Regression
    @Regression
    Scenario: WSC product cart
        Given I opened Cart page and Verified the most recent item
        When I placed the order
        And I opened the orders page 
        Then I verified the order number and order status