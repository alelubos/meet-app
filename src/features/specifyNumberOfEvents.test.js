import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import App from '../App';
import Event from '../Event';
import { mockData } from '../mock-data';
import { mount, shallow } from 'enzyme';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  // tests
  test('When user hasn’t specified a number, 32 is the default number.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper, NumberInput;
    given(
      'the user sees a list of events and an input field for the number of events to show',
      () => {
        AppWrapper = mount(<App />);
        NumberInput = AppWrapper.find('.number').at(0);
      }
    );
    when('the user does not indicate any number in this input field', () => {});

    then('a value of 32 should be the default value', () => {
      expect(NumberInput.prop('value')).toBe(32);
    });
  });

  test('User can change the number of events they want to see.', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper, NumberInput;
    given(
      'the user sees a list of events and an input field for the number of events to show',
      () => {
        AppWrapper = mount(<App />);
        NumberInput = AppWrapper.find('.number');
      }
    );

    when(
      'the user indicates a number in this field (for e.g.: 1)',
      async () => {
        await NumberInput.simulate('input', { target: { value: 1 } });
      }
    );

    then('a maximum of 1 events should be displayed per page', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(1);
    });
  });
});
