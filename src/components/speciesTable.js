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

    this.state = {data: [], sortedData: []};
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

  render() {
    var rows = [];
    if(this.state.data) {
      this.state.data.forEach(function(fish) {
        rows.push(<SpeciesRow remove={this.handleRemove} fish={fish} key={fish._id} />);
      }, this);
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
          <button onClick={() => this.props.remove(this.props.fish._id)}>x</button>
        </td>
      </tr>
    );
  }
}

export default SpeciesTable;
