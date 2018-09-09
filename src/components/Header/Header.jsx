import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Menu } from 'semantic-ui-react';

class Header extends React.Component {
  SuburbSearch() {
    return (
      <div className="ui icon input" style={{width:'100%'}}>
        <Autocomplete
          style={{minWidth: '30vw'}}
          onPlaceSelected={this.props.onSuburbSelected}
          types={['(regions)']}
          componentRestrictions={{country: "au"}}
        />
        <i aria-hidden="true" className="search icon"/>
      </div>
    );
  }

  render() {
    return (
      <Menu>
        <Menu.Item header>
          <strong>CouncilPlus</strong>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Header;