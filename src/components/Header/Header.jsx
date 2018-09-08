import React from 'react';

import {
  Input,
  Menu,
} from 'semantic-ui-react';

class Header extends React.Component {

  render() {
    return (
      <Menu attached="top">
        <Menu.Item header>
          <strong>HealthHack</strong>
        </Menu.Item>
        <Menu.Menu position="right" fluid style={{width: "100%"}}>
          <Menu.Item fluid style={{width: "100%"}}>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;