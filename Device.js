import React, { Component } from 'react';
import { Card, List } from 'semantic-ui-react'

function Random(props) {
   var maxNumber = 500;
   var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
   return randomNumber;
}

class Device extends Component {
    render() {
        return (
          <Card color='teal'>
            <Card.Content>
              <Card.Header className="ui teal header">{this.props.device.name}</Card.Header>
            </Card.Content>
            <Card.Content>
              <List>
                <List.Item>
                  <List.Icon className="left server teal icon" />
                  <List.Content>
                    Serial Num: {this.props.device.serialNumber}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon className="object teal group icon" />
                  <List.Content>
                    Group: {this.props.device.group}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon className="bars teal icon" />
                  <List.Content><div className="content">Messages: <Random/></div></List.Content>
                </List.Item>
              </List>
            </Card.Content>
            <Card.Content extra>
              
            </Card.Content>
          </Card>
        );
    }
}
export default Device;
