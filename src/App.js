import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
  };

  updateEvents = (
    location = this.state.selectedLocation,
    numberOfEvents = this.state.numberOfEvents
  ) => {
    if (location === this.state.selectedLocation) {
      this.setState({ numberOfEvents });
      return;
    }
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
        selectedLocation: location,
        numberOfEvents,
      });
    });
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.eventCount),
          locations: extractLocations(events),
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <div className="container">
          <NumberOfEvents updateEvents={this.updateEvents} />
          <EventList
            events={this.state.events.slice(0, this.state.numberOfEvents)}
            eventCount={this.state.eventCount}
          />
        </div>
      </div>
    );
  }
}

export default App;
