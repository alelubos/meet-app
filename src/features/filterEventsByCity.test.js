import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  test("When user hasn't searched for a city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't searched for any city", () => {});
    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });
    then('the user should see the list of all upcoming events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    });
  });

  test('User should see a list of suggestions when they search for a city', ({
    given,
    when,
    then,
  }) => {
    let CitySearchWrapper;
    let locations = extractLocations(mockData);
    given('the main page is open', () => {
      CitySearchWrapper = shallow(
        <CitySearch updateEvents={() => {}} locations={locations} />
      );
    });
    when('the user starts typing in the city textbox', () => {
      CitySearchWrapper.find('.city').simulate('change', {
        target: { value: 'London' },
      });
    });
    then(
      "the user should receive a list of cities (suggestions) that match what they've typed",
      () => {
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
      }
    );
  });

  test('User can select a city from the suggested list', ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given('the user was typing "London" in the city textbox', async () => {
      AppWrapper = await mount(<App />);
      AppWrapper.find('.city').simulate('change', {
        target: { value: 'London' },
      });
    });
    and('the list of suggested cities is showing', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });
    when(
      'the user selects a city (e.g., "London, UK") from the list',
      async () => {
        AppWrapper.find('.suggestions li').at(0).simulate('click');
      }
    );
    then(
      'their city should be changed to that city (i.e., "London, UK")',
      () => {
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        expect(CitySearchWrapper.state('query')).toBe('London, UK');
      }
    );
    and(
      'the user should receive a list of upcoming events in that city',
      async () => {
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      }
    );
  });
});
