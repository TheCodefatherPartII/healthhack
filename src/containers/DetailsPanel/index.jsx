import React from "react";
import { connect } from "react-redux";
import DataService  from '../../services/DataService';
import PetitionsPane from './Petititons';
import DetailsPane from './DetailsPane';
import {
  Tab,
  Table,
  Message,
  Segment,
  Header,
  List,
  Icon,
  ListItem,
  Label,
} from "semantic-ui-react";
import AboutPane from "../../components/About";
import ContactDetails from "./ContactDetails";

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

  render() {
    if (!this.state.lga) return <AboutPane/>;

    const panes = [
      { menuItem: "Information", render: () => <DetailsPane {...this.state} { ...this.props }/> },
      { menuItem: "Contacts", render: () => <ContactDetails {...this.state}/> },
      { menuItem: "Petitions", render: () => <PetitionsPane {...this.state}/> }
    ];

    return <Tab menu={{ secondary: true }} panes={panes} />;
  }
}

const mapStateToProps = ({ indicators }) => ({
  indicators
});

export default connect(mapStateToProps)(DetailsPanel);
