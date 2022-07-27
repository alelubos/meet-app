import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventsToDisplay: 32,
  };

  handleNumberChanged = (event) => {
    this.setState({ eventsToDisplay: event.target.value });
  };

  render() {
    return (
      <div className="numberOfEvents">
        <label for="number">Number of Events:</label>
        <input
          type="text"
          name="number"
          className="number"
          value={this.state.eventsToDisplay}
          onChange={this.handleNumberChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
