Feature: Filter events by city

Scenario: When user hasn't searched for a city, show upcoming events from all cities.
Given user hasn't searched for any city
When the user opens the app
Then the user should see the list of all upcoming events

Scenario: User should see a list of suggestions when they search for a city
Given the main page is open
When the user starts typing in the city textbox
Then the user should receive a list of cities (suggestions) that match what they've typed

Scenario: User can select a city from the suggested list
Given the user was typing "London" in the city textbox
And the list of suggested cities is showing
When the user selects a city (e.g., "London, UK") from the list
Then their city should be changed to that city (i.e., "London, UK")
And the user should receive a list of upcoming events in that city
