import React, {Component} from 'react';
import {API, graphqlOperation }  from "aws-amplify";
import * as queries from '../../graphql/queries';
import * as subscriptions from '../../graphql/subscriptions';
import DeviceSearchBar from './DeviceSearchBar';
import DeviceTableView from './DeviceTableView';
import DeviceCardView from './DeviceCardView';
import Divider from '@material-ui/core/Divider';

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
      currentView: 'LIST_VIEW'
    }
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSwitchView =  this.handleSwitchView.bind(this);
  }

  componentDidMount() {
    this.listDevices();
    this.subscribeCreateDevice();
    this.subscribeUpdateDevice();
    this.subscribeDeleteDevice();
  }

  handleSwitchView(name) {
    if (name === this.state.currentView){
    } else {
      this.setState({
        currentView: name
      })
    }
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
    var numDevices = result.data.searchDevices.items.length;
    if(numDevices === 0){
      console.log('No Items');
    }else {
      console.log(numDevices + ' Items');
    }
    this.setState({devices:result.data.searchDevices.items});
  }

  listDevices = async () => {
      const devices = await API.graphql(graphqlOperation(queries.listDevices,{limit:1000}));
      this.setState({devices:devices.data.listDevices.items});
  }

  subscribeCreateDevice = async () => {
    API.graphql(
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
    API.graphql(
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
    API.graphql(
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

    const currentView = this.state.currentView;
    let view;

    if(currentView === 'CARD_VIEW') {
      view = <DeviceCardView devices={this.state.devices} />
    }else if(currentView === 'LIST_VIEW'){
      view = <DeviceTableView devices={this.state.devices} />
    }

    return (
      <div>
        <DeviceSearchBar getSearchString={this.handleSearch} handleSwitchView={this.handleSwitchView}/>
        <Divider light />
        {view}
      </div>
    );
  }
}

export default DeviceView;
