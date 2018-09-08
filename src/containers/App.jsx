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

  onMapClicked = (...x) => {
    this.setState({visible: !this.state.visible});
  }
  onSuburbSelected = (place) => alert(place);

  render() {
    if (!this.props.scriptsLoadedSuccessfully) return null;

    return (
      <Container fluid style={{height: '100%'}}>
        <Header onSuburbSelected={this.onSuburbSelected}/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              <HealthMap onMapClicked={this.onMapClicked} style={{height: '100%'}} />
            </Grid.Column>
            <Grid.Column width={7}>
        <DetailsPanel visible={this.state.visible} style={{height: '100%'}} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ScriptLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyBRFyLekDBT0Zh0fF0I2zpcto38orRJ5OA&libraries=places')(App);