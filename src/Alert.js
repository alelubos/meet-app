import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      height: '50px',
      marginTop: '-18px',
    };
  };

  render() {
    return (
      <div className="alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

class ErrorAlert extends Alert {
  getStyle = () => {
    return {
      color: 'red',
      height: '20px',
      marginTop: '-25px',
    };
  };
}

export { InfoAlert, ErrorAlert };
