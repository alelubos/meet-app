import React, { Component } from 'react';

class Event extends Component {
  state = {
    isCollapsed: true,
  };

  handleToggleDetails = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event">
        <h1 className="title">{event.summary}</h1>
        <p className="date-time">{event.start.dateTime}</p>
        <span className="location">{event.location}</span>
        {this.state.isCollapsed ? (
          <></>
        ) : (
          <div className="details">
            <h2 className="subtitle">About event:</h2>
            <a href={event.htmlLink} className="link">
              See details on Google Calendar
            </a>
            <p className="description">{event.description}</p>
          </div>
        )}
        <br /> <br />
        <button className="details-button" onClick={this.handleToggleDetails}>
          {this.state.isCollapsed ? 'show details' : 'hide details'}
        </button>
      </div>
    );
  }
}

export default Event;
