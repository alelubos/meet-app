import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import { InfoAlert } from './Alert';
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from 'recharts';

export default class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
  };

  getData = () => {
    const { locations, events } = this.state;
    let data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ')[0].split(' -')[0];
      return { city, number };
    });
    return (data = data.sort((a, b) => a.city > b.city));
  };

  handleConnectionStatus = () => {
    let text = navigator.onLine
      ? ''
      : 'No connection: the displayed list is based on cached data';
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
    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleConnectionStatus);
      window.addEventListener('offline', this.handleConnectionStatus);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleConnectionStatus);
      window.removeEventListener('offline', this.handleConnectionStatus);
    }
  }

  render() {
    const { locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <div className="container">
          <NumberOfEvents updateEvents={this.updateEvents} />
          <h4 style={{ color: 'hsl(22, 34%, 43%)' }}>Events per City</h4>
          <ResponsiveContainer height={300}>
            <ScatterChart
              margin={{
                top: 10,
                right: 20,
                bottom: 10,
                left: 0,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="City" />
              <YAxis
                type="number"
                dataKey="number"
                name="events"
                allowDecimals={false}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Events" data={this.getData()} fill="#6e3d21" />
            </ScatterChart>
          </ResponsiveContainer>
          <InfoAlert text={this.state.connectionStatusText} />
          <EventList
            events={this.state.events.slice(0, numberOfEvents)}
            eventCount={this.state.eventCount}
          />
        </div>
      </div>
    );
  }
}
