Feature:PhoenX StockList validation

    application Regression
    @GetDetails
    Scenario: WSC LOG in
        Given I open the url
        When I put the Email and password
        And I Got all the local storage Items
        Then I Stored the local storage Items to the fixtures



    # @SetDetails
    # Scenario: WSC LOG in
    #     Given I set the local storage items