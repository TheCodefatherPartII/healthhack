import React from 'react';
import {
  Divider,
  Header,
  Message,
  Segment,
  List
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
          To start using the application click on the map on the left to zoom into your Local Government Area to reveal a wide variety of statistics.
          <Divider/>
          <List as='ul'>
            <List.Item as='li'><strong>Information Pane:</strong>
              <br/>This pane shows the aggregated data about the LGA; like a census data, number of services in the area and a quick comparison snapshot against other surrounding councils, etc.
              <br/><br/>
            </List.Item>
            <List.Item as='li'><strong>Contacts Pane:</strong><br/>
              This pane shares information about the local Council Representative.<br/><br/>
            </List.Item>
            <List.Item as='li'>
              <strong>Petitions Pane:</strong>
              <br/>This pane allows to start a petition on a concerning issue in the community. Community members can view all the available petitions and vote on them.
              <br/><br/>
            </List.Item>
            <List.Item as='li'><strong>Statistics Pane:</strong><br/>
              This pane shows you the statistics on community services like Health Services, Schools, Child Care Centers, etc and lets you compare the Crime rate with other LGAs.</List.Item>
          </List>
        </Segment>
      </div>
    );
  }
}

export default AboutPane;