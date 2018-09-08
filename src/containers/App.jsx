import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import ScriptLoader from 'react-script-loader-hoc';

import Header from '../components/Header/Header';
import HealthMap from './HealthMap'
import DetailsPanel from './DetailsPanel';

class App extends Component {
  state = {
    visible: true
  }

  onMapClicked = (poly) => {
    this.setState({
      lgaName: poly.tag.nsw_lga__2,
      selectedLga: poly.tag.lg_ply_pid,
    })

    const bounds = new poly.google.maps.LatLngBounds()
    for (let i in poly.paths) {
      const point = poly.paths[i]
      bounds.extend(new poly.google.maps.LatLng(point.lat, point.lng));
    }
    this.onSuburbSelected({geometry: {location: bounds.getCenter()}})
  }
  onSuburbSelected = (place) => {
    this.setState({
      searchedLocation: place.geometry.location
    })
  };

  render() {
    if (!this.props.scriptsLoadedSuccessfully) return null;

    return (
      <Container fluid style={{height: '100%'}}>
        <Header onSuburbSelected={this.onSuburbSelected}/>
        <Grid>
          <Grid.Row style={{height: '100%'}}>
            <Grid.Column width={9} className='map-container'>
              <HealthMap
                mapCenter={this.state.searchedLocation}
                selectedLga={this.state.selectedLga}
                onMapClicked={this.onMapClicked}
                style={{height: '100%'}}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <DetailsPanel
                lgaName={this.state.lgaName}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Container>
    );
  }
}

export default ScriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA&libraries=places')(App);