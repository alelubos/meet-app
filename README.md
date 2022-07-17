# meet-app

## Project's Goal:
To build a **serveless** (with AWS), **progressive web application** (PWA), using **React** with a **test-driven-development** (TDD) approach.
The app uses the **Google Calendar API** to fecth data from upcoming events. 

## Description:
Meet-app is an application that allows a user to get information about upcoming events in a number of cities around the world.

### Features as user stories:

#### #1 Filter Events by City:
As a user, I should be able to filter events by city, so that I can see a list of events that take place in that city.
- **Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.**
  - Given the user hasn’t search for any city,
  - When the user opens the app,
  - Then the user should see a list of all upcoming events. 
- **Scenario 2: User should see a list of suggestions when they search for a city.**
  - Given the main page is open,
  - When the user starts typing the name of a city,
  - Then the user should see a list of available cities that match what he has typed so far.  
- **Scenario 3: User can select a city from the suggested list.**
  - Given  the user was typing a city name in the search box,
  - When the user selects a city name from the list of matching cities,
  - Then their selected city should be changed to that city and the app should only display a list of upcoming events for that city.  

#### #2 Show/Hide an Event’s Details
As a user, I should be able to click on a button to either expand or collapse a pane on each event, where there’s more detailed information about it.
- **Scenario 1: An event element is collapsed by default.**
  - Given  is using the app,
  - When the user is presented with a list of events,
  - Then every event in the list should be hiding its details pane (collapsed) by default. 
- **Scenario 2: User can expand an event to see its details.**
  - Given  the user sees a list of events in its collapsed state (minimized view),
  - When the user clicks on an event’s button to see all of its details,
  - Then the event should expand it’s details pane showing all the information about it and its button should now indicate the user can opt to collapse it to its minimized view.
- **Scenario 3: User can collapse an event to hide its details.**
  - Given  an event is being displayed expanded with all of its details,
  - When the user clicks on the event’s button to show less details, 
  - Then the event should collapse its expanded view showing its minimized view and its button should switch for the user to be able toggle its sate to an expanded view.

#### #3 Specify Number of Events
As a user, I should be able specify the number of events I want to see displayed on the app, so that I can see more or less events in the list at once.
- **Scenario 1: When user hasn’t specified a number, 32 is the default number.**
  - Given  the user is presented a page with a list of events and an input field to indicate the amount of events to be displayed per-page,
  - When the user does not indicate any number in this input field,
  - Then a maximum of 32 events should be displayed per page as default and, if more events are available, the user should be able to switch between pages to navigate them all (pagination).
- Scenario 2: User can change the number of events they want to see.
  Given the user is seeing a page with a list of events with an input field to indicate the amount of events to be displayed per-page
  When the user indicates a number in this field (for e.g.: 8 events per-peage) 
  Then a maximum of 8 events should be displayed per page and, if more events are available, the user should be able to switch between pages to display them all (pagination).

#### #4 Use the App when Offline
As a user, I should be able to use the App even when I don’t have an internet connection, so that I can at least see the events I saw last time I was online.
- **Scenario 1: Show cached data when there’s no internet connection.**
  - Given  the user is offline,
  - When the user opens the app,
  - Then a list of the events he viewed last time he was online (cached data) should be displayed.
- **Scenario 2: Show error when user changes the settings (city, time range).**
  - Given the user is using the app offline,
  - When the user attemps to access information that is not catched (see events from a different city, show the expanded view of an event, etc.),
  - Then an error message should be displayed indicating this information is not available offline. 

#### #5 Data Visualization
As a user, I should be able to see a chart that shows the number of events by cities, to have an overview of the amount of upcoming events per city
- **Scenario 1: Show a chart with the number of upcoming events in each city.**
  - Given  the user is using the app,
  - When the user clicks on the button/link to show the graph of events by city,
  - Then a chart should be displayed showing the cities with their number of upcoming events. 

