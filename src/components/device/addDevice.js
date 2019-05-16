import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../../graphql/mutations';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class AddDevice extends Component {

  state = {
    open: false,
    serialNumber: '',
    group: '',
    deviceId: '',
    name: '',
    activationCode: '',
    activated: '',
    type: '',
    endpoint: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };


  handleSubmit = (e) => {
    this.setState({ open: false });
    var itemDetails = {
      serialNumber: this.state.deviceSerialNumber,
      group: this.state.deviceGroup,
      deviceId: this.state.deviceDeviceId,
      name: this.state.deviceName,
    }
    console.log("Item Details : " + JSON.stringify(itemDetails))
    API.graphql(graphqlOperation(mutations.createDevice, {input: itemDetails}));
    // window.location.reload()
  }

  render() {
    const { classes } = this.props;
      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button  mini color="inherit" aria-label="Add" onClick={this.handleClickOpen}>
        <AddIcon />
      </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a New Device</DialogTitle>
          <DialogContent className={classes.container}>
            <FormGroup>
              <TextField
                required
                style={{marginRight: 10}}
                id="deviceName"
                label="Name"
                type="string"
                onChange={this.handleChange('deviceName')}
              />
              <TextField
                required
                style={{marginRight: 10}}
                id="deviceSerialNumber"
                label="serialNumber"
                type="string"
                onChange={this.handleChange('deviceSerialNumber')}
              />
              <TextField
                required
                style={{marginRight: 10}}
                id="deviceGroup"
                label="Group"
                type="string"
                onChange={this.handleChange('deviceGroup')}
              />
              <TextField
                required
                style={{marginRight: 10}}
                id="deviceDeviceId"
                label="DeviceId"
                type="string"
                onChange={this.handleChange('deviceDeviceId')}
              />
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default  withStyles(styles)(AddDevice);
