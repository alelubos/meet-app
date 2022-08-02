import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import { mockData } from '../mock-data';
import { mount, shallow } from 'enzyme';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    let EventsWrapper;
    given('the user is using the app', () => {
      AppWrapper = shallow(<App />);
    });
    when('the user is presented with a list of events', () => {
      AppWrapper.update();
      EventsWrapper = AppWrapper.find('.event');
    });
    then(
      'every event in the list should be hiding its details by default',
      () => {
        for (let i = 0; i < mockData.length; i++) {
          expect(EventsWrapper.at(i).exists('.details')).toBe(false);
        }
      }
    );
  });

  test('User can expand an event to see its details', ({
    given,
    when,
    then,
    and,
  }) => {
    let AppWrapper;
    let EventsWrapper;
    given('the user sees a list of events in its collapsed state', () => {
      AppWrapper = mount(<App />);
      EventsWrapper = AppWrapper.find('.event');
      expect(EventsWrapper.find('.details').exists()).toBe(false);
    });
    when('the user clicks on an events button', () => {
      AppWrapper.update();
      AppWrapper.find('.details-button').at(0).simulate('click');
    });
    then('the event should show all its details', () => {
      expect(AppWrapper.find('.details').exists()).toBe(true);
    });
    and('its button text should be: hide details', () => {
      expect(AppWrapper.find('.details-button').at(0).text()).toBe(
        'hide details'
      );
    });
  });

  test('User can collapse an event to hide its details', ({
    given,
    when,
    then,
    and,
  }) => {
    let AppWrapper = mount(<App />);
    let FirstEventWrapper;
    given('an event is showing all of its details', () => {
      AppWrapper.update();
      FirstEventWrapper = AppWrapper.find('.event').at(0);
      FirstEventWrapper.find('.details-button').simulate('click');
      expect(AppWrapper.find('.details').exists()).toBe(true);
    });
    when('the user clicks on the event button (hide details)', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.details-button').at(0).text()).toBe(
        'hide details'
      );
      AppWrapper.find('.details-button').at(0).simulate('click');
    });

    then('the event should collapse to its minimized view', () => {
      expect(AppWrapper.find('.details').exists()).toBe(false);
    });

    and('its button text should be: show details', () => {
      expect(AppWrapper.find('.details-button').at(0).text()).toBe(
        'show details'
      );
    });
  });
});
