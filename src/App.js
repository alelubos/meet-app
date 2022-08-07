import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert } from './Alert';

window.addEventListener('online', this.handleConnectionStatus);
window.addEventListener('offline', this.handleConnectionStatus);

export default class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
    connectionStatusText: '',
  };

  handleConnectionStatus = () => {
    let text = navigator.onLine
      ? ''
      : 'Currently Offline: the displayed list is based on cached data';
    this.setState({ connectionStatusText: text });
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
          events,
          locations: extractLocations(events),
        });
      }
    });
    // window.addEventListener('online', this.handleConnectionStatus);
    // window.addEventListener('offline', this.handleConnectionStatus);
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener('online', this.handleConnectionStatus);
    window.removeEventListener('offline', this.handleConnectionStatus);
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
          <InfoAlert text={this.state.connectionStatusText} />
          <EventList
            events={this.state.events.slice(0, this.state.numberOfEvents)}
            eventCount={this.state.eventCount}
          />
        </div>
      </div>
    );
  }
}
