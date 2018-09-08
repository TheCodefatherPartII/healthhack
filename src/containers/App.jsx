import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header/Header';
import HealthMap from './HealthMap'
import DetailsPanel from './DetailsPanel';

class App extends Component {
  state = {
    visible: false
  }

  onMapClick = () => this.setState({visible: !this.state.visible})

  render() {
    return (
      <Container fluid>
        <Header/>
        <HealthMap onMapClick={this.onMapClick} />
        <DetailsPanel visible={this.state.visible} />
      </Container>
    );
  }
}

export default App;
