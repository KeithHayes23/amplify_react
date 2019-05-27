import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {API, graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import Loader from '../common/Loader';
import SearchBar from './SearchBar'
import Device from './Device'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '5px'
  },
};

function findIndexByKeyValue(obj, key, value)
{
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] === value) {
            return i;
        }
    }
    return null;
}

class DeviceView extends Component {
  constructor(){
    super();
    this.state = {
      devices: [],
      showCard: true

    }
      this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.listDevices();
    this.subscribeCreateDevice();
    this.subscribeUpdateDevice();
    this.subscribeDeleteDevice();
  }

  handleSearch = async (_string) => {
    console.log(_string);
    if(_string === ''){
      console.log('Empty');
      this.listDevices();
      return;
    }
    const filter = {filter: { name : { matchPhrasePrefix : _string }}};
    const result = await API.graphql(graphqlOperation(queries.searchDevices, filter));
    console.log(result);
    var numDevices = result.data.searchDevices.items.length;
    if(numDevices === 0){
      console.log('No Items');
    }else {
      console.log(numDevices + ' Items');
    }
    this.setState({devices:result.data.searchDevices.items});
  }

  listDevices = async () => {
      const devices = await API.graphql(graphqlOperation(queries.listDevices,{limit:25}));
      console.log(devices);
      this.setState({devices:devices.data.listDevices.items});
  }

  subscribeCreateDevice = async () => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateDevice)
    ).subscribe({
      next: deviceData => {
        const data = deviceData.value.data.onCreateDevice
        const devices = this.state.devices.concat(data)
        this.setState({ devices })
      }
    });
  }

  subscribeUpdateDevice = async () => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateDevice)
    ).subscribe({
      next: deviceData => {
        const data = deviceData.value.data.onUpdateDevice
        console.log(data)
        var index = findIndexByKeyValue(this.state.devices,"id",data.id)
        console.log(index)
        Object.assign(this.state.devices[index], data)
        const devices = this.state.devices
        this.setState({ devices })
      }
    });
  }

  subscribeDeleteDevice = async () => {
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onDeleteDevice)
    ).subscribe({
      next: deviceData => {
        const data = deviceData.value.data.onDeleteDevice
        var index = findIndexByKeyValue(this.state.devices,"id",data.id)
        this.state.devices.splice(index,1);
        const devices = this.state.devices
        this.setState({ devices })
      }
    });
  }

  render(){

    const showCard = this.state.showCard;
    let view;

    const { classes } = this.props;
    const renderComponent = this.state.renderComponent;

    const CardView = ({ devices }) => (
      <div >
      <Grid container className={classes.root} spacing={16}>
          {devices.map(device => (
             <Grid key={device.id} item>
                 <Device device={device}/>
             </Grid>
             ))}
         </Grid>
      </div>
    );

    if(showCard) {
      view = <CardView devices={this.state.devices} />
    }else {

    }

    return (
      <div>
        <SearchBar getSearchString={this.handleSearch} />
        {view}
      </div>
    );
  }
}

DeviceView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceView);
