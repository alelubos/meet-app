import React, { Component } from 'react';
import { InfoAlert } from './Alert';
class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: false,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({ query: value, suggestions });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: '',
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
    });
    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        <InfoAlert text={this.state.infoText} />

        <label for="city">Search Events by City:</label>
        <input
          type="text"
          name="city"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: 'none' }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li
            key="all"
            onClick={() => this.handleItemClicked('all')}
            style={{ fontWeight: '800' }}
          >
            See all Cities
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
