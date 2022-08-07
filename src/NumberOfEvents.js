import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventsCount: 32,
  };

  handleNumberChanged = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= 32) {
      this.props.updateEvents(undefined, value);
      this.setState({ eventsCount: value, errorText: '' });
    } else {
      this.setState({
        eventsCount: this.state.value,
        errorText: 'Select a number between 1 and 32',
      });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <ErrorAlert text={this.state.errorText} />
        <label for="number">Number of Events:</label>
        <br />
        <input
          type="number"
          name="number"
          className="number"
          // min="1"
          // max="32"
          value={this.state.eventsCount}
          onInput={this.handleNumberChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
