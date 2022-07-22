Feature:PhoenX Cart Page Validation

    application Regression
    @Regression
    Scenario: WSC product cart
        Given I opened order page
        When I verified the order number from fixture file
        And I verified the order fullfilment status from fixture file 
        And I verified the order Payment status