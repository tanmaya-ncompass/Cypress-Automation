Feature:PhoenX Admin Channel Page Validation

    @ChannelSearch
    Scenario: WSC Admin Channel Search Functionality
        Given I opened channel page in Admin login
        When I randomly select an item number and searched it
        And I verified the search result item number
        Then I cleared the search box



    @ChannelNegativeTesting
    Scenario: WSC Admin Channel Search Functionality
        Given I opened channel page in Admin login
        When I randomly select an item number and store its total availability
        When I clicked on edit button of that item
        And I tried put random number in stock list and not assigned field
        And I verified all the positive and negative testing
        And I changed the channel of the item randomly
        Then I verified the total availability, stock list, not assigned and default channel under the particular channel tab