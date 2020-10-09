import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div class="container">
      <div class="header-results">
        <h3 class = "results-title">{props.data.City},{props.data.State}</h3>
      </div>
      <div class="single-result">
      <ul>
        <li>State: {props.data.State}</li>
        <li>Location: ({props.data.Lat},{props.data.Long})</li>
        <li>Population (estimated): {props.data.EstimatedPopulation}</li>
        <li>Total Wages: {props.data.TotalWages}</li>
      </ul>
      </div>
    </div>
    );
}

function ZipSearchField(props) {
  return (
      <div class="searchField">
        Zip Code:
        <input type="text" onChange={(e)=>props.zipChanged(e)}/> 
      </div>
    );
}


class App extends Component {
  state = {
    userInput: "",
    cities: []
  }

  handleZipChange(event){   //does console log
    this.setState({
      userInput : event.target.value,
    })

    fetch('http://ctp-zip-api.herokuapp.com/zip/'+event.target.value)
      .then(response => response.json())
      .then(jsonData => {
          this.setState({
            cities: jsonData
          });
      });
  }


  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(event) => this.handleZipChange(event)} value={this.state.userInput} />
        <div>
          { this.state.cities.map((item) => { 
            return <City data={item} />;
            })}
        </div>
      </div>
    );
  }
  
}

export default App;
