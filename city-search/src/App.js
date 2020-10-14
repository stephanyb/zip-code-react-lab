import React, { Component } from 'react';
import './App.css';

function CitySearchField(props) {
  return (
    <div class="searchField">
      City: 
      <input type="text" onChange={(e)=>props.cityChanged(e)}/> 
      <div>
        <h3>ZipCodes in {props.value}: </h3>
      </div>
    </div>
  );
}
function Zip(props){
  return(
    <ul>
      <li>{props.zip}</li>
    </ul>
  )
}

function Zip3Col(props) {
  return(
    <ul id="ul-3col">
      <li>{props.zip1}</li>
      <li>{props.zip2}</li>
      <li>{props.zip3}</li>    
    </ul>
  )
}
function Zip4Col(props){
  return(
    <ul id="ul-4col">
      <li>{props.zip1}</li>
      <li>{props.zip2}</li>
      <li>{props.zip3}</li>
      <li>{props.zip4}</li>      
    </ul>
  )
}

class App extends Component {

  state = {
    userInput: "",
    zipCodes: []
  }

  handleCityChange(event){  //does console log
    this.setState({
      userInput : event.target.value.toUpperCase()
    })
    fetch('http://ctp-zip-api.herokuapp.com/city/'+event.target.value.toUpperCase())
      .then(response => response.json())
      .then(jsonData => {
          this.setState({
            zipCodes: jsonData
          });
      });
  }
  

  render() {
      var num = 0;
      return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField cityChanged={(event) => this.handleCityChange(event)} value={this.state.userInput} />
        <div class="results-container">
          {
            this.state.zipCodes.map((zipCodes) => {
              num=num+4;
              if(this.state.zipCodes.length%2 == 0 && num< (this.state.zipCodes.length) )
              {
                return (
                  <Zip4Col zip1={this.state.zipCodes[num]} zip2={this.state.zipCodes[num+1]} zip3={this.state.zipCodes[num+2]} zip4={this.state.zipCodes[num+3]}/>
                )
              }
              else if(this.state.zipCodes.length%2 != 0 && num< (this.state.zipCodes.length)){
                num=num-1;
                return(<Zip3Col zip1={this.state.zipCodes[num]} zip2={this.state.zipCodes[num+1]} zip3={this.state.zipCodes[num+2]}/>)
              }
              else if(this.state.zipCodes.length <2){
                num=0;
                return(<Zip zip={this.state.zipCodes[num++]} />)
              }
            })
          } 
        </div>
      </div>
    );
      }
}

export default App;
