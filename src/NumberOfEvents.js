import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    eventsCount: 32,
  };

  handleNumberChanged = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= 32) {
      this.props.updateEvents(undefined, value);
      this.setState({ eventsCount: value });
    } else {
      this.setState({ eventsCount: this.state.eventsCount });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <label for="number">Number of Events:</label>
        <br />
        <input
          type="number"
          name="number"
          className="number"
          min="1"
          max="32"
          value={this.state.eventsCount}
          onInput={this.handleNumberChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
