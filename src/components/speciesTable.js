import React, { Component } from 'react';
import SpeciesForm from './speciesForm';
import Searchbar from './searchbar'

const SERVER_URL = "http://localhost:8080/species/";

class SpeciesTable extends Component {
  constructor(props){
    super(props);

    this.handleUserAdd = this.handleUserAdd.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handlUpdate = this.handlUpdate.bind(this);

    this.state = {data: [], sortedData: [], speciesId: ""};
  }

  fetchDateFromServer() {
    fetch(SERVER_URL)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json,
          sortedData: json
        });
    });
  }

  componentDidMount() {
    this.fetchDateFromServer();
  }

  handleUserAdd(name, image, speciesId) {
    const newSpecies = {name: name, image: image, _id: speciesId};
    const newData = this.state.data;
    newData.push(newSpecies);

    this.setState({ data: newData, sortedData: newData});
  }

  handleRemove(speciesId) {
    fetch('http://localhost:8080/species/' + speciesId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.json());
    });

    const remainder = this.state.data.filter((data) => {
      return (data._id !== speciesId);
    });

    this.setState({data: remainder, sortedData: remainder});
  }

  handleSearch(keywords) {
    console.log(keywords);
    console.log(this.state.sortedData);

    const searchResult = this.state.sortedData.filter((fish) => {
      return (
        fish.name.toUpperCase().includes(keywords.toUpperCase()) ||
        fish.name.toLowerCase().includes(keywords.toLowerCase())
      );
    });

    this.setState({data: searchResult});
  }

  handleEdit(speciesId) {
    console.log(speciesId);
    this.setState({speciesId: speciesId});
  }

  handlUpdate(fishName, image, speciesId) {
    fetch(SERVER_URL + speciesId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: fishName,
        image: image
      })
    })
    .then(response => {
      console.log(response.json());
    });

    var newData = this.state.data;
    newData.forEach(fish => {
      if(fish._id === speciesId) {
        fish.name = fishName;
        fish.image = image;
      }
    });

    console.log(newData);
    this.setState({data: newData, sortedData: newData, speciesId: ""});
  }

  render() {
    var rows = [];
    if(this.state.data) {
      this.state.data.forEach((fish) => {
        if(this.state.speciesId === fish._id) {
          rows.push(
            <EditableSpeciesRow
              edit={this.handleEdit}
              update={this.handlUpdate}
              remove={this.handleRemove}
              fish={fish}
              key={fish._id} />
            );
        } else {
          rows.push(
            <SpeciesRow
              edit={this.handleEdit}
              remove={this.handleRemove}
              fish={fish}
              key={fish._id} />
            );
        }
      });
    }

    return (
      <div>
        <Searchbar search={this.handleSearch} />
        <SpeciesForm onUserAdd={this.handleUserAdd} />
        <table className="species-table">
          <caption className="table-name">Species Table</caption>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class SpeciesRow extends Component {
  render() {
    return (
      <tr className="w3-red">
        <td>{this.props.fish._id}</td>
        <td>{this.props.fish.name}</td>
        <td><img alt="" className="fish-image" src={this.props.fish.image} /></td>
        <td>
          <button className="delete-btn" onClick={() => this.props.remove(this.props.fish._id)}>DELETE</button>
          <button className="edit-btn" onClick={() => this.props.edit(this.props.fish._id)}>EDIT</button>
        </td>
      </tr>
    );
  }
}

class EditableSpeciesRow extends Component {
  render() {
    const fishName = this.props.fish.name;
    return (
      <tr className="w3-red">
        <td>{this.props.fish._id}</td>
        <td><input
              ref={(input) => this.fishNameInput = input}
              type="text"
              defaultValue={fishName} />
          </td>
        <td><img alt="" className="fish-image" src={this.props.fish.image} /></td>
        <td>
          <button className="delete-btn" onClick={() => this.props.remove(this.props.fish._id)}>DELETE</button>
          <button className="update-btn" onClick={() => this.props.update(this.fishNameInput.value, this.props.fish.image, this.props.fish._id)}>UPDATE</button>
        </td>
      </tr>
    );
  }
}

export default SpeciesTable;
