import React from 'react';

import {
  Header,
  Segment,
  List,
  ListItem,
  Sidebar,
  Icon,
  Label,
  Button,
} from 'semantic-ui-react';

class DetailsPanel extends React.Component {
  render() {
    return (
      <Sidebar direction="bottom" visible={this.props.visible}>
        <Segment.Group>
          <Segment>
            <Header>Indicators</Header>
            <List>
              {['wheelchair', 'hospital', 'home'].map(ind =>
                <ListItem key={ind}>
                  <Label image>
                    <Icon circular name={ind} />
                    {ind} = {(Math.random() * 100).toFixed(0)}%
                  </Label>
                </ListItem>
              )}
            </List>
          </Segment>
          <Segment>
            <Header>Available Services</Header>
            <List>
              {['Hospitals', 'General practices'].map(ind =>
                <ListItem key={ind}>
                  {ind}
                </ListItem>
              )}
            </List>
          </Segment>
        </Segment.Group>
      </Sidebar>
    );
  }
}

export default DetailsPanel;