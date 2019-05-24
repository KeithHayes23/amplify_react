import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {API, graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import Loader from './Loader';
import SearchBar from './SearchBar'
import Device from './device/Device'

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

class CardView extends Component {
  constructor(){
    super();
    this.state = {
      devices: []
    }
      this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.listDevices();
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


  onNewItem = (prevQuery, newData) => {
    let updatedQuery = Object.assign({}, prevQuery);
    var index;
    //console.log(prevQuery.listDevices.items)
    //console.log(newData)
    if(newData.onCreateDevice) {
        updatedQuery.listDevices.items = prevQuery.listDevices.items.concat([newData.onCreateDevice]);
    } else if(newData.onDeleteDevice) {
        index = findIndexByKeyValue(prevQuery.listDevices.items,"id",newData.onDeleteDevice.id)
        updatedQuery.listDevices.items.splice(index,1);
    } else if(newData.onUpdateDevice) {
        index = findIndexByKeyValue(prevQuery.listDevices.items,"id",newData.onUpdateDevice.id)
        Object.assign(updatedQuery.listDevices.items[index], newData.onUpdateDevice)
    }else {
      console.log('SO3B')
    }
    return updatedQuery;
  }

  render(){

    const { classes } = this.props;
    const renderComponent = this.state.renderComponent;



    const DeviceView = ({ devices }) => (
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

    return (
      <div>
        <SearchBar getSearchString={this.handleSearch} />
        <DeviceView devices={this.state.devices} />
      </div>
    );
  }
}

CardView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardView);
