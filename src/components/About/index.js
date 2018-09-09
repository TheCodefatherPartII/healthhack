import React from 'react';
import {
  Divider,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

class AboutPane extends React.PureComponent {

  render() {
    return (
      <div>
        <Message
          attached
          header='GovHack 2018'
          content='Sydney Bracket'
        />
        <Segment attached>
          <Header as='h4'>How does this work?</Header>
          <Divider/>

        </Segment>
      </div>
    );
  }
}

export default AboutPane;