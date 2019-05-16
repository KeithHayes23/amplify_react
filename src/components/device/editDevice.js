import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { API, graphqlOperation } from "aws-amplify";
import * as mutations from '../../graphql/mutations';


class EditDevice extends Component {

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
    console.log("Current Item: " + this.props.currentItem.name)
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
      id: this.props.currentItem.id,
      name: this.state.deviceName || this.props.currentItem.name,
      group: this.state.deviceGroup || this.props.currentItem.group,
      serialNumber: this.state.deviceSerialNumber || this.props.currentItem.serialNumber,
      deviceId: this.state.deviceDeviceId || this.props.currentItem.deviceId
    }
    API.graphql(graphqlOperation(mutations.updateDevice, {input: itemDetails}));
    // window.location.reload()
  }

  render() {
      return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      <Button size='small' aria-label="Edit" onClick={this.handleClickOpen}>
        EDIT
      </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Device: {this.props.currentItem.name}</DialogTitle>
          <DialogContent>
            <FormGroup>
              <TextField
                style={{marginRight: 10}}
                id="deviceName"
                placeholder={this.props.currentItem.name}
                label="Name"
                type="string"
                onChange={this.handleChange('deviceName')}
              />
              <TextField
                style={{marginRight: 10}}
                id="deviceGroup"
                placeholder={this.props.currentItem.group}
                label="Group"
                type="string"
                onChange={this.handleChange('deviceGroup')}
              />
              <TextField
                style={{marginTop: 10}}
                id="deviceSerialNumber"
                placeholder={this.props.currentItem.serialNumber}
                label="Serial Number"
                type="string"
                onChange={this.handleChange('deviceSerialNumber')}
              />
              <TextField
                style={{marginTop: 10}}
                id="deviceDeviceId"
                placeholder={this.props.currentItem.deviceId}
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
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditDevice;
