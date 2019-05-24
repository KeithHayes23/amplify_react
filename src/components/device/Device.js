import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupIcon from '@material-ui/icons/Group';
import DeviceIcon from '@material-ui/icons/DevicesOther';
import LocationIcon from '@material-ui/icons/LocationOn';
import SerialNumberIcon from '@material-ui/icons/ConfirmationNumber';
import indigo from '@material-ui/core/colors/indigo';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import EditDevice from './editDevice'
import DeleteDevice from './deleteDevice'

const styles = theme => ({
  panel: {
    minHeight: 105,
    minWidth: 275,
    maxWidth: 150,
  },
  card: {
    minWidth: 275,
    maxWidth: 150,
  },
  title: {
    fontSize: 14,
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: indigo[500],
  },
});

class Device extends Component {

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <ExpansionPanel>
        <ExpansionPanelSummary className={classes.panel} expandIcon={<ExpandMoreIcon />}>
        <CardHeader
           avatar={
             <Avatar className={classes.avatar}>
               {this.props.device.name.charAt(0)}
             </Avatar>
           }
           title={this.props.device.name}
         >
        </CardHeader>
        </ExpansionPanelSummary>
        <Divider light />
        <ExpansionPanelDetails>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <LocationIcon/>
                  <ListItemText primary="lon: 0.0" secondary="lat: 0.0"  />
                </ListItemIcon>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupIcon/>
                  <ListItemText primary="Group" secondary={this.props.device.group}  />
                </ListItemIcon>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DeviceIcon/>
                  <ListItemText primary="Device Id" secondary={this.props.device.deviceId} />
                </ListItemIcon>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SerialNumberIcon/>
                  <ListItemText primary="Serial Number" secondary={this.props.device.serialNumber} />
                </ListItemIcon>
              </ListItem>
            </List>
        </ExpansionPanelDetails>
        <Divider light />
        <ExpansionPanelActions>
          <EditDevice currentItem={this.props.device}/>
          <DeleteDevice currentItem={this.props.device}/>
        </ExpansionPanelActions>

        </ExpansionPanel>
      </Card>
    );
  }
}
export default withStyles(styles)(Device)
