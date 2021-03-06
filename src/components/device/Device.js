import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import EditDevice from './editDevice'
import DeleteDevice from './deleteDevice'

const styles = theme => ({
  panel: {
    width: 275,
  },
  details: {
    width: 275,
    height: 275,
  },
  action: {
    width: 275,
    minHeight: 35,
    maxHeight: 35,
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
        <ExpansionPanelDetails className={classes.details}>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <LocationIcon/>
                </ListItemIcon>
                <ListItemText primary="lon: 0.0" secondary="lat: 0.0"  />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupIcon/>
                </ListItemIcon>
                <ListItemText primary="Group" secondary={this.props.device.group}  />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DeviceIcon/>
                </ListItemIcon>
                <ListItemText primary="Device Id" secondary={this.props.device.deviceId} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <SerialNumberIcon/>
                </ListItemIcon>
                <ListItemText primary="Serial Number" secondary={this.props.device.serialNumber} />
              </ListItem>
            </List>
        </ExpansionPanelDetails>
        <Divider light />
        <ExpansionPanelActions className={classes.action}>
          <EditDevice currentItem={this.props.device}/>
          <DeleteDevice currentItem={this.props.device}/>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}
export default withStyles(styles)(Device)
