import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Device from './Device';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    
  },
};

class DeviceCardView extends Component {
  constructor(props){
    super(props);
    this.state = {
      dummy: []
    }
  };
  render() {
    const { classes, devices } = this.props;
    return (
      <Grid className={classes.root}>
        {devices.map(device => (
          <Device key={device.id} device={device}/>
        ))}
      </Grid>
    )
  }
}


export default withStyles(styles)(DeviceCardView);
