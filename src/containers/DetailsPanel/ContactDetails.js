import React from 'react';
import { Icon, Table } from "semantic-ui-react";

class ContactDetails extends React.Component {

  render() {
    const {
      ORGNAME,
      MAYOR_SAL,
      MAYOR_FIRST,
      MAYOR_LAST,
      PHONE
    } = this.props.lga;

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
              <Table.Cell>{[MAYOR_SAL, MAYOR_FIRST, MAYOR_LAST].join(' ')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Icon name="phone" />
                &nbsp; Phone Number:
              </Table.Cell>
              <Table.Cell>
                <a href={"tel:" + PHONE.replace(' ', '')}>{PHONE}</a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ContactDetails;
