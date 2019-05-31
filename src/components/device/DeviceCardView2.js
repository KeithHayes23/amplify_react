import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Device from './Device';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '5px',
  },
};

class DeviceCardView extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      dummy: []
    }
  };
  render() {
    const { classes, devices } = this.props;
    return (
      <Grid container className={classes.root} spacing={1}>
        {devices.map(device => (
          <Device key={device.id} device={device}/>
        ))}
      </Grid>
    )
  }
}
DeviceCardView.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DeviceCardView);
