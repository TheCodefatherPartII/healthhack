import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Menu } from 'semantic-ui-react';

class Header extends React.Component {
  SuburbSearch() {
    return (
      <div className="ui icon input" style={{width:'100%'}}>
        <Autocomplete
          style={{minWidth: '40vw'}}
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
      <Menu attached="top">
        <Menu.Item header>
          <strong>HealthHack</strong>
        </Menu.Item>
        <Menu.Menu position="right" className='suburb-search'>
          <Menu.Item className='suburb-search'>
           {this.SuburbSearch()}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;