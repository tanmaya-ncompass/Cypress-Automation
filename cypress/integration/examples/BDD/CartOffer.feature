Feature:PhoenX Cart Page Validation

    application Regression
    @Regression
    Scenario: WSC product cart
        Given I opened Offer Awaiting tab in Cart page 
        When I Verified the warehouse and item number for Offer option
        And I Verified the availability and offer price
        Then I verified the price