import React, { Component } from 'react';
import SpeciesTable from './components/speciesTable'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <SpeciesTable />
      </div>
    );
  }
}

export default App;
