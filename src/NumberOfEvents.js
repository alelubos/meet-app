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
      <div>
        <label for="number">Number of Events:</label>
        <input
          type="number"
          name="number"
          className="number"
          onChange={this.handleNumberChanged}
        >
          {this.state.eventsToDisplay}
        </input>
      </div>
    );
  }
}

export default NumberOfEvents;
