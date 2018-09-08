import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header/Header';
import HealthMap from './HealthMap'

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Header/>
        <HealthMap/>
      </Container>
    );
  }
}

export default App;
