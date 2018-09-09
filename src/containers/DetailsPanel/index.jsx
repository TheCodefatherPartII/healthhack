import React from "react";
import { connect } from "react-redux";
import DataService from "../../services/DataService";

import {
  Input,
  Header,
  Segment,
  List,
  ListItem,
  Icon,
  Label,
  Tab,
  Table,
  TextArea,
  Button,
  Message,
  Card,
  Image,
  Grid,
  Progress
} from "semantic-ui-react";

class DetailsPanel extends React.Component {
  state = {};

  componentDidMount = () => {
    const service = new DataService();

    service
      .getContactDetails()
      .then(lgaDetails => this.setState({ lgaDetails }));
  };

  componentWillUpdate(previousProps) {
    if (this.props === previousProps || !this.props.lgaName) return;

    const lgaName = this.props.lgaName.trim().toUpperCase();

    const lga = this.state.lgaDetails.find(
      l => l.ORGNAME.trim().toUpperCase() === lgaName
    );

    console.log(lga);

    if (lga) this.setState({ lga });
  }
  renderStatistics = () => {
    console.log(this.state.lga);

    const population = parseInt(this.state.lga.POPULATION, 10);
    return (
      <div>
        <Message
          info
          icon="map marker alternate"
          header={this.state.lga.ORGNAME}
          content={
            !Number.isNaN(population) ? population + " residents" : undefined
          }
        />

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
            {["Hospitals", "General practices"].map(ind => (
              <ListItem key={ind}>{ind}</ListItem>
            ))}
          </List>
        </Segment>
      </div>
    );
  };

  renderContactDetails = () => {
    const {
      ORGNAME,
      MAYOR_SAL,
      MAYOR_FIRST,
      MAYOR_LAST,
      PHONE
    } = this.state.lga;

    return (
      <div>
        <p>
          These are the details of your local MP. Start a communication channel
          and raise your concerns.
        </p>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Icon name="home" />
                &nbsp; Council:
              </Table.Cell>
              <Table.Cell>{ORGNAME}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="user" />
                &nbsp; Mayor:
              </Table.Cell>
              <Table.Cell>
                {[MAYOR_SAL, MAYOR_FIRST, MAYOR_LAST].join(" ")}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="phone" />
                &nbsp; Phone Number:
              </Table.Cell>
              <Table.Cell>
                <a href={"tel:" + PHONE.replace(" ", "")}>{PHONE}</a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  };

  renderPetitionsDetails = () => {
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
                  <Progress percent={44} progress />
                  <a>
                    <Icon name="thumbs up outline" />
                    40,320 Votes
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
                  <Progress percent={36} progress />
                  <a>
                    <Icon name="thumbs up outline" />
                    34,312 Votes
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
    );
  };

  render() {
    if (!this.state.lga) return null;

    const panes = [
      { menuItem: "Information", render: this.renderStatistics },
      { menuItem: "Contacts", render: this.renderContactDetails },
      { menuItem: "Petitions", render: this.renderPetitionsDetails }
    ];

    return <Tab menu={{ secondary: true }} panes={panes} />;
  }
}

const mapStateToProps = ({ indicators }) => ({
  indicators
});

export default connect(mapStateToProps)(DetailsPanel);
