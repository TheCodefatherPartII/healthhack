import React from "react";
import { connect } from "react-redux";
import DataService  from '../../services/DataService';
import {Bar} from '@nivo/bar';
import PetitionsPane from './Petititons';
import DetailsPane from './DetailsPane';
import StatsPane from './StatsPane';
import {
  Tab,
} from "semantic-ui-react";
import AboutPane from "../../components/About";
import ContactDetails from "./ContactDetails";


class DetailsPanel extends React.Component {
  state = { };

  componentDidMount = () => {
    const service = new DataService();

    service.getContactDetails()
      .then(lgaDetails => this.setState({ lgaDetails }));
  };

  componentWillUpdate(previousProps) {
    if (this.props === previousProps || !this.props.lgaName) return;

    const lgaName = this.props.lgaName.trim().toUpperCase();

    const lga = this.state.lgaDetails.find(
      l => l.ORGNAME.trim().toUpperCase() === lgaName
    );

    console.log(lga);

    if (lga)
      this.setState({ lga });
  }

  render() {
    if (!this.state.lga) return <AboutPane/>;

    const panes = [
      { menuItem: "Information", render: () => <DetailsPane {...this.state} { ...this.props }/> },
      { menuItem: "Contacts", render: () => <ContactDetails {...this.state}/> },
      { menuItem: "Petitions", render: () => <PetitionsPane {...this.state}/> },
      { menuItem: "Stats", render: () => <StatsPane { ...this.props }/> }
    ];

    return <Tab menu={{ secondary: true }} panes={panes} />;
  }
}

const mapStateToProps = ({ indicators }) => ({
  indicators
});

export default connect(mapStateToProps)(DetailsPanel);
