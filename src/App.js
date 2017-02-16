import React, { Component } from 'react';
import SpeciesTable from './components/speciesTable'
// import ImageForm from './components/imageForm'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <SpeciesTable />
        {/* <ImageForm /> */}
      </div>
    );
  }
}

export default App;
