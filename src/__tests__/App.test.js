import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

describe('<App/> Component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    // Test for existence of EventList component
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch.', () => {
    // Test for existence of CitySearch component
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});
