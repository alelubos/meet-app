import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import { mockData } from '../mock-data';

describe('<CitySearch/> Component', () => {
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData);
    // locations array is passed to shallow CitySearch as props for test purposes
    CitySearchWrapper = shallow(
      <CitySearch locations={locations} updateEvents={() => {}} />
    );
  });
  afterAll(() => {
    CitySearchWrapper.unmount();
  });

  test('render text input (.city) that filters events by city', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('render text input value correctly from state "query"', () => {
    const query = CitySearchWrapper.state('query');
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
  });

  test('change state (query) when text input is changed by user', () => {
    CitySearchWrapper.setState({ query: 'Munich' });
    const eventObject = { target: { value: 'Berlin' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('selecting input reveals the suggestions list', () => {
    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({
      display: 'none',
    });
  });

  test('render list of City suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('selecting a suggestion should update query state', async () => {
    CitySearchWrapper.setState({ suggestions: locations });
    const firstSuggestion = CitySearchWrapper.state('suggestions').at(0);
    await CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(firstSuggestion);
  });

  test('selecting a suggestion should hide the suggestions list', () => {
    CitySearchWrapper.setState({ query: 'Berlin', showSuggestions: true });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({
      display: 'none',
    });
  });

  test('render list of suggestions correctly', () => {
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
      suggestions.length + 1
    );
    for (let i = 0; i < suggestions.length; i++) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(
        suggestions[i]
      );
    }
  });

  test('suggestion list match the query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] });
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Berlin' },
    });
    const query = CitySearchWrapper.state('query');
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
  });
});
