import React, { PropTypes, Component } from 'react';
import { connect }                     from 'react-redux';
import { fetchAutomaticApiData }       from '../actions/actionIndex';
import FuelSpeedVis                    from '../components/fuelSpeedVis';

export default class App extends Component {

  componentDidMount() {
    console.log('props: ', this.props);
    this.props.fetchAutomaticApiData('https://api.automatic.com/trip/');
  }

  componentDidUpdate() {
    console.log('upprops: ', this.props);
  }

  render() {
    return (
      <div>  
        <FuelSpeedVis apiData={this.props.apiData} />
      </div>
    )
  }
}

App.propTypes = {
  fetchAutomaticApiData: React.PropTypes.func,
  apiData: React.PropTypes.object
}

// Turn App into a connected component. Since this is a small app, it will be
// responsible for ajax and passing the results to its children

function mapStateToProps(state) {
  return state;
}

export const AppContainer = connect(mapStateToProps, {fetchAutomaticApiData})(App);


