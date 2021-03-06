import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// UNIT TESTS
describe('<App/> Component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });
  // Test for existence of components
  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });
  test('render NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
  test('render CitySearch.', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});

// INTEGRATION TESTS
describe('<App /> Integration', () => {
  // check PROPS passed to children components
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });
  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).prop('locations')).toBe(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  // COMPONENTS Integration
  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    const lastIndex = suggestionItems.length - 1;
    await suggestionItems.at(lastIndex).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('changing NumberOfEvents eventsCount state should restrict events displayed in EventList and update numberOfEvents state in App', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const EventListWrapper = AppWrapper.find(EventList);
    const newNumberOfEvents = Math.ceil(Math.random() * 32);
    await NumberOfEventsWrapper.find('.number').simulate('input', {
      target: { value: newNumberOfEvents },
    });
    const eventsCount = NumberOfEventsWrapper.state('eventsCount');
    expect(AppWrapper.state('numberOfEvents')).toBe(eventsCount);
    expect(EventListWrapper.find(Event).length).not.toBeGreaterThan(
      eventsCount
    );
    AppWrapper.unmount();
  });
});
