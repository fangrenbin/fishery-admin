import React, { Component } from 'react';

const SERVER_URL = "http://localhost:8080/species/";

class SpeciesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      image: '',
      _id: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNewSpecies = this.addNewSpecies.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] : value
    });
  }

  addNewSpecies(event) {
    if(this.state.name === '' || this.state.name === ''){
      event.preventDefault();
    } else {
      fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          image: this.state.image
        })
      })
      .then(response => response.json())
      .then(json => {
        this.props.onUserAdd(json.name, json.image, json._id);
      });
    }
  }

  render() {
    return (
      <div className="add-new-species">
        <p>Create new one:</p>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="species name" />
        <input type="text" name="image" value={this.state.image} onChange={this.handleChange} placeholder="image url" />
        <button onClick={this.addNewSpecies}>Add</button>
      </div>
    );
  }
}

export default SpeciesForm;
