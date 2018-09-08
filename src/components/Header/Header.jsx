import React from 'react';

import {
  Input,
  Menu,
} from 'semantic-ui-react';

class Header extends React.Component {
  state = { searchString: '' };

  onChange = (i, event) => {
    this.setState({ searchString: event.value.trim() });
  };

  onKeyPress = event => {
    if (event.key.toLowerCase() !== 'enter') return;

    console.log('perform search callback');
    // this.props.performSearch(this.state.searchString);
  };

  render() {
    return (
      <Menu attached="top">
        <Menu.Item header>
          <strong>HealthHack</strong>
        </Menu.Item>
        <Menu.Menu position="right" fluid style={{width: "100%"}}>
          <Menu.Item fluid style={{width: "100%"}}>
            <Input

              value={this.state.searchString}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              icon='search'
              placeholder='Search...'
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;