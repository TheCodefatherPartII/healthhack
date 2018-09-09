import React from 'react';
import { Button, Card, Grid, Header, Icon, Image, Input, Segment, Table, TextArea } from "semantic-ui-react";

class PetitionsPane extends React.Component {
  render() {
    return (
      <div>
        <p>
          CouncilPlus allows you to create or support other neighbours'
          petitions to improve your Council or Local Government Area. Create or
          sign one. The power of the community resides in the general awareness
          and consequent action!
        </p>
        <Segment>
          <Header>Create a Petition</Header>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Icon name="user  " />
                  &nbsp; Name
                </Table.Cell>
                <Table.Cell>
                  <Input className="petitions__input" />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="mail square" />
                  &nbsp; Email
                </Table.Cell>
                <Table.Cell>
                  <Input className="petitions__input" />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="users" />
                  &nbsp; Petition
                </Table.Cell>
                <Table.Cell>
                  <TextArea className="petitions__input" />
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell colSpan="2" className="petitions__submit-wrapper">
                  <Button className="petitions__submit">Submit</Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Segment>
          <Header>Current Petitions</Header>
          <Grid className="petitions-grid">
            <Grid.Column key="1" className="petition-wrapperx">
              <Card className="petition">
                <Image src="https://placeimg.com/640/480/arch" />
                <Card.Content>
                  <Card.Header>Funding</Card.Header>
                  <Card.Meta>
                    <span className="date">Created in 2018</span>
                  </Card.Meta>
                  <Card.Description>
                    Maintain funding for station
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="thumbs up outline" />
                    10,320 Votes
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column key="2" className="petition-wrapperx">
              <Card className="petition">
                <Image src="https://placeimg.com/640/480/nature" />
                <Card.Content>
                  <Card.Header>Security</Card.Header>
                  <Card.Meta>
                    <span className="date">Created in 2017</span>
                  </Card.Meta>
                  <Card.Description>Keep council secure</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="thumbs up outline" />
                    12,312 Votes
                  </a>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
          {/* <List className="petitions-list">
            <ListItem>
              <Card className="petition">
                <Image src="https://placeimg.com/640/480/arch" />
                <Card.Content>
                  <Card.Header>Funding</Card.Header>
                  <Card.Meta>
                    <span className="date">Created in 2018</span>
                  </Card.Meta>
                  <Card.Description>
                    Maintain funding for Stations
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="hand point up outline" />
                    22 Votes
                  </a>
                </Card.Content>
              </Card>
            </ListItem>
            <ListItem>
              <Card className="petition">
                <Image src="https://placeimg.com/640/480/arch" />
                <Card.Content>
                  <Card.Header>Funding</Card.Header>
                  <Card.Meta>
                    <span className="date">Created in 2018</span>
                  </Card.Meta>
                  <Card.Description>
                    Maintain funding for Stations
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name="hand point up outline" />
                    22 Votes
                  </a>
                </Card.Content>
              </Card>
            </ListItem>
          </List> */}
        </Segment>
      </div>
    )
  }
}

export default PetitionsPane;