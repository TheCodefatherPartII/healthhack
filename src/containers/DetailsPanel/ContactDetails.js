import React from 'react';
import { Icon, Message, Table } from "semantic-ui-react";

class ContactDetails extends React.Component {

  render() {
    const {
      EMAIL,
      MAYOR_SAL,
      MAYOR_FIRST,
      MAYOR_LAST,
      ORGNAME,
      PHONE
    } = this.props.lga;

    return (
      <div>
        <Message
          icon='question mark'
          header="Is there an issue in your area?"
          content='The best way to create change is to speak to your local representatives'
        />
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Cell><Icon name="home" /></Table.Cell>
              <Table.Cell>Council:</Table.Cell>
              <Table.Cell>{ORGNAME}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Icon name="user" /></Table.Cell>
              <Table.Cell>Representative: </Table.Cell>
              <Table.Cell>{[MAYOR_SAL, MAYOR_FIRST, MAYOR_LAST].join(' ')}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Icon name="phone" /></Table.Cell>
              <Table.Cell>Phone Number:</Table.Cell>
              <Table.Cell>
                <a href={"tel:" + PHONE.replace(' ', '')}>{PHONE}</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Icon name="at" /></Table.Cell>
              <Table.Cell>Email Address:</Table.Cell>
              <Table.Cell>
                <a href={"mailto:" + EMAIL}>{EMAIL}</a>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default ContactDetails;
