import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import ScriptLoader from 'react-script-loader-hoc';

import Header from '../components/Header/Header';
import HealthMap from './HealthMap'
import DetailsPanel from './DetailsPanel';
import DataService from '../services/DataService';

class App extends Component {
  state = {
    visible: true,
    services: [],
    crime: [],
    loading: true,
  }

  componentDidMount() {
    new DataService().loadMappableData().then(res => {
      const [
        hospitals,
        childcare,
        schools,
        crime
      ] = res
      this.setState({
        services: [
          ...hospitals.map(h => ({...h, serviceType: 'hospital'})),
          ...schools.map(s => ({...s, serviceType: 'school', id: s.schoolCode})),
          ...childcare.map(c => ({...c, serviceType: 'childcare'})),
        ],
        crime,
        loading: false,
      })
    })
  }

  onMapClicked = (poly) => {
    this.setState({
      lgaName: poly.tag.nsw_lga__2,
      selectedLga: poly.tag.lg_ply_pid,
      selectedLgaId: poly.tag.nsw_lga__3,
      selectedLgaStats: poly.tag.services
    })
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
                {...this.state}
              />
            </Grid.Column>
            <Grid.Column width={7}>
              <DetailsPanel
                {...this.state}
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