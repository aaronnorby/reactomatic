import React, { Component } from 'react';
import FuelSpeedVis       from '../components/fuelSpeedVis';

export default class App extends Component {
  render() {
    return (
      <div>  
        <div id="app-view">
          Hello from App!
        </div>  
        <FuelSpeedVis />
      </div>
    )
  }
}
