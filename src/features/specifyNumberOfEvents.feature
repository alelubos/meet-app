Feature: Specify Number of Events

Scenario: When user hasn’t specified a number, 32 is the default number.
Given the user sees a list of events and an input field for the number of events to show
When the user does not indicate any number in this input field
Then a value of 32 should be the default value

Scenario: User can change the number of events they want to see.
Given the user sees a list of events and an input field for the number of events to show
When the user indicates a number in this field (for e.g.: 1) 
Then a maximum of 1 events should be displayed per page
