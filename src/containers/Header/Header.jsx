import React from 'react';

import {
  Input,
  Menu,
} from 'semantic-ui-react';

class Header extends React.Component {

  render() {
    return (
      <Menu attached="top">
        <Menu.Item>
          <strong>HealthHack</strong>
        </Menu.Item>
        <Menu.Item>
          <Input icon='search' placeholder='Search...' />
        </Menu.Item>
      </Menu>
    );
  }
}

export default Header;