import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

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
