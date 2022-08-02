Feature: Show/Hide an Event’s Details

Scenario: An event element is collapsed by default
Given the user is using the app
When the user is presented with a list of events
Then every event in the list should be hiding its details by default

Scenario: User can expand an event to see its details
Given the user sees a list of events in its collapsed state
When the user clicks on an events button
Then the event should show all its details 
And its button text should be: hide details

Scenario: User can collapse an event to hide its details
Given an event is showing all of its details
When the user clicks on the event button (hide details)
Then the event should collapse to its minimized view 
And its button text should be: show details