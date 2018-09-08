import React from 'react';
import { connect } from 'react-redux'

import {
  Header,
  Segment,
  List,
  ListItem,
  Sidebar,
  Icon,
  Label,
} from 'semantic-ui-react';

class DetailsPanel extends React.Component {
  render() {
    const { indicators } = this.props;
    return (
      <Sidebar direction="bottom" visible={this.props.visible}>
        <Segment.Group>
          <Segment>
            <Header>Indicators</Header>
            <List>
              {indicators.map(ind =>
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

const mapStateToProps = ({indicators}) => ({
  indicators, 
})

export default connect(mapStateToProps)(DetailsPanel);