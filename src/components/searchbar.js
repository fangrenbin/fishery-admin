import React, { Component } from 'react';

class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    this.props.search(this.searchTextInput.value);
  }

  render() {
    return (
      <form>
        Search Speices:
        <input onChange={this.handleChange}
          ref={(input) => this.searchTextInput = input}
          className="search-input"
          type="text"
          placeholder="input species name to search" />
      </form>
    );
  }
}

export default Searchbar;
