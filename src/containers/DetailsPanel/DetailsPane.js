import React from 'react';
import { Header, Icon, Label, Grid, List, ListItem, Message, Segment } from "semantic-ui-react";
import { Bar } from "@nivo/bar";

class DetailsPane extends React.Component {
  render() {
    const population = parseInt(this.props.lga.POPULATION, 10);
    return (
      <div>

        <Message
          info
          icon='map marker alternate'
          header={this.props.lga.ORGNAME}
          content={!Number.isNaN(population)
            ? population.toLocaleString() + ' residents'
            : undefined}
          attached="top"
        />
          <Segment attached>
            <Grid>
            <Grid.Row columns={16}>
              <Grid.Column width={1}>
                <Icon name="ambulance"/>
              </Grid.Column>
              <Grid.Column width={7}>
                <strong>Health Services:</strong>
              </Grid.Column>
              <Grid.Column width={7}>
                8th state-wide
              </Grid.Column>
              <Grid.Column width={1}>
                <Icon name='arrow alternate circle up'/>
              </Grid.Column>
            </Grid.Row>
            </Grid>
          </Segment>
          <Segment attached>
            wowowfklsdslk;a
          </Segment>

        <Segment>
          <Header>Indicators</Header>
          <List>
            {["wheelchair"].map(ind => (
              <ListItem key={ind}>
                <Label image>
                  <Icon circular name={ind} />
                  {ind} = {(Math.random() * 100).toFixed(0)}%
                </Label>
              </ListItem>
            ))}
          </List>
        </Segment>
        <Segment>
          <Header>Available Services</Header>
          <List>
            {
              Object.keys(this.props.selectedLgaStats).map(type => 
                <ListItem image>
                  <img src={`/${type}.png`} style={{verticalAlign: 'middle'}} />
                  {' '}
                  {this.props.selectedLgaStats[type]} {type.replace('childcare', 'childcare centre')}s
                </ListItem>
              )
            }
          </List>
        </Segment>
      </div>
    );
  }
}

export default DetailsPane;