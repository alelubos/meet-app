import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> Component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  // Test necessary elements are rendered
  test('render label for input text box', () => {
    expect(NumberOfEventsWrapper.find('label[for="number"]')).toHaveLength(1);
  });
  test('render input text box', () => {
    expect(NumberOfEventsWrapper.find('.number')).toHaveLength(1);
  });

  // Test necessary elements have correct value
  test('label for input box displays correct text', () => {
    expect(NumberOfEventsWrapper.find('label[for="number"]').text()).toBe(
      'Number of Events:'
    );
  });
  test('input value should be iniatially that of state "eventsToDisplay" (32)', () => {
    let eventsToDisplay =
      NumberOfEventsWrapper.state('eventsToDisplay').toString();
    expect(NumberOfEventsWrapper.find('.number').text()).toBe(eventsToDisplay);
  });

  // Test that state "eventsToDisplay" is updated with user's input
  test('change state "eventsToDisplay" when user types number of events', () => {
    NumberOfEventsWrapper.find('.number').simulate('change', {
      target: { value: 12 },
    });
    expect(NumberOfEventsWrapper.state('eventsToDisplay')).toBe(12);
  });
});
