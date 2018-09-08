import React from 'react';

import {
  Input,
  Menu,
  Segment,
} from 'semantic-ui-react';

class Shell extends React.Component {

  render() {
    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item name='HealthHack' />
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
        </Menu>
      </Segment>
    );
  }
}

export default Shell;