import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header/Header';

class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Header/>

      </Container>
    );
  }
}

export default App;
