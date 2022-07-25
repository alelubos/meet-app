import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> Component', () => {
  let EventWrapper;
  let event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
  });

  test('render Event initially in collapsed view', () => {
    expect(EventWrapper.state('isCollapsed')).toBe(true);
    expect(EventWrapper.exists('.details')).toBe(false);
  });

  // Test presence of necessary elements
  test('render Event with title', () => {
    expect(EventWrapper.find('.title')).toHaveLength(1);
  });
  test('render Event with date/time', () => {
    expect(EventWrapper.find('.date-time')).toHaveLength(1);
  });
  test('render Event with a location', () => {
    expect(EventWrapper.find('.location')).toHaveLength(1);
  });
  test('render Event with "toggle-details" button', () => {
    expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
  });

  // Test necessary elements render with correct values
  test('render Event with a correct title', () => {
    expect(EventWrapper.find('.title').text()).toBe(event.summary);
  });
  test('render Event with correct date/time', () => {
    expect(EventWrapper.find('.date-time').text()).toBe(event.start.dateTime);
  });
  test('render Event with correct location', () => {
    expect(EventWrapper.find('.location').text()).toBe(event.location);
  });
  test('render Event with button with correct text', () => {
    expect(EventWrapper.find('.toggle-details').text()).toBe('show details');
  });

  // Test functionality when button "show details" is clicked
  test('when button "show details" is clicked details pane is displayed', () => {
    EventWrapper.find('.toggle-details').simulate('click');
    expect(EventWrapper.state('isCollapsed')).toBe(false);
    expect(EventWrapper.exists('.details')).toBe(true);
  });
});

describe('<Event /> Component displaying "details"', () => {
  let EventWrapper;
  let event = mockData[0];
  beforeAll(() => {
    EventWrapper = shallow(<Event event={event} />);
    EventWrapper.setState({ isCollapsed: false });
  });

  // Test presence of elements in 'details' pane
  test('render subtitle', () => {
    expect(EventWrapper.exists('.subtitle')).toBe(true);
  });
  test('render link to Calendar event', () => {
    expect(EventWrapper.exists('.link')).toBe(true);
  });
  test('render event description', () => {
    expect(EventWrapper.exists('.description')).toBe(true);
  });

  // Test elements display correct values
  test('subtitle has text "About event:"', () => {
    expect(EventWrapper.find('.subtitle').text()).toBe('About event:');
  });
  test('link element has correct text and href value', () => {
    expect(EventWrapper.find('.link').text()).toBe(
      'See details on Google Calendar'
    );
    let selectorWithHref = `.link[href="${event.htmlLink}"]`;
    expect(EventWrapper.find(selectorWithHref)).toHaveLength(1);
  });
  test('description element has correct value', () => {
    expect(EventWrapper.find('.description').text()).toBe(event.description);
  });
  test('button has "hide details" text', () => {
    expect(EventWrapper.find('.toggle-details').text()).toBe('hide details');
  });

  // Test button functionality
  test('when clicking on button "hide details" the details pane is collapsed', () => {
    EventWrapper.find('.toggle-details').simulate('click');
    expect(EventWrapper.state('isCollapsed')).toBe(true);
    expect(EventWrapper.exists('.details')).toBe(false);
  });
});
