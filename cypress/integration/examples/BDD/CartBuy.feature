Feature:PhoenX Cart Page Validation

    application Regression
    @Regression
    Scenario: WSC product cart
        Given I opened Cart page
        When I Verified the warehouse and item number for Buy option
        And I Verified the availability
        Then I verified the price