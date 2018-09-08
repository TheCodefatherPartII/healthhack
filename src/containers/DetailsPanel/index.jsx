import React from 'react';
import { connect } from 'react-redux'

import {
  Header,
  Segment,
  List,
  ListItem,
  Icon,
  Label,
  Tab,
  Table
} from 'semantic-ui-react';

class DetailsPanel extends React.Component {
  renderStatistics() {
    return (
      <div>
      <Segment>
        <Header>Indicators</Header>
        <List>
          {['wheelchair'].map(ind =>
            <ListItem key={ind}>
              <Label image>
                <Icon circular name={ind}/>
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
    </div>
    );
  }

  renderContactDetails = () => {
    return (
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Icon name='home' />&nbsp; Council:
            </Table.Cell>
            <Table.Cell>Dubbo Regional Council</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name='user' />&nbsp; Mayor:
            </Table.Cell>
            <Table.Cell>Leigh Walker</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Icon name='phone' />&nbsp; Phone Number:
            </Table.Cell>
            <Table.Cell><a href="tel:0268014000">02 6801 4000</a></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  };

  render() {
    const panes = [
      { menuItem: 'Information', render: this.renderStatistics },
      { menuItem: 'Contacts', render: this.renderContactDetails }
      ];

    return (
      <Tab menu={{ secondary: true }} panes={panes}/>
    );
  }
}

const mapStateToProps = ({indicators}) => ({
  indicators,
});

export default connect(mapStateToProps)(DetailsPanel);