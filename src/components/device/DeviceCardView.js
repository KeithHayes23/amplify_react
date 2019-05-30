import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Device from './Device';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '5px'
  },
};

class DeviceCardView extends Component {
  constructor(props){
    super(props);
  };
  render() {
    const { classes, devices } = this.props;
    return (
      <Grid container className={classes.root} spacing={16}>
        {devices.map(device => (
           <Grid key={device.id} item>
               <Device device={device}/>
           </Grid>
        ))}
      </Grid>
    )
  }
}
DeviceCardView.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DeviceCardView);
