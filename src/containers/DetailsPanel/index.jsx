import React from "react";
import { connect } from "react-redux";
import DataService  from '../../services/DataService';
import PetitionsPane from './Petititons';
import DetailsPane from './DetailsPane';
import StatsPane from './StatsPane';
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
    console.log(this.props, this.state);

    const service = new DataService();

    service
      .getContactDetails()
      .then(lgaDetails => this.setState({ lgaDetails }));
  };

  updateLGA = () => {
    if (!this.props.lgaName) return;

    const lgaName = this.props.lgaName.trim().toUpperCase();

    const lga = this.state.lgaDetails.find(
      l => l.ORGNAME.trim().toUpperCase() === lgaName
    );

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
            {Object.keys(this.props.selectedLgaStats).map(service => (
              <ListItem key={service} image>
                <img src={`./${service}.png`} style={{verticalAlign: 'middle'}} />
                {' '}
                {this.props.selectedLgaStats[service]} {service.replace('childcare', 'childcare centre')}s
              </ListItem>
            ))}
          </List>
        </Segment>
      </div>
    );
  };

  componentDidMount() {
    this.updateLGA();
  }

  componentWillUpdate(previousProps) {
    if (this.props !== previousProps || !this.state.lga)
      this.updateLGA();
  }

  render() {
    if (!this.state.lga) return <AboutPane/>;

    const panes = [
      { menuItem: "Information", render: () => <DetailsPane {...this.state} { ...this.props }/> },
      { menuItem: "Statistics", render: () => <StatsPane {...this.state} { ...this.props }/> },
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
