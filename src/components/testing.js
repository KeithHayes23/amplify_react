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
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '10px'
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
      items: null,
      searchResults: null
    }
      this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.listDevices();
  }
  runMe = async (_string) => {
    const filter = {filter: { name : { match : _string }}};
    const result = await API.graphql(graphqlOperation(queries.searchDevices, filter));
    console.log(result);
    var numDevices = result.data.searchDevices.items.length;
    if(numDevices === 0){
      console.log('No Items');
    }else {
      console.log(numDevices + ' Items');
    }
    this.setState({items:result.data.searchDevices.items});
  }

  async listDevices(){
      const devices = await API.graphql(graphqlOperation(queries.listDevices));
      console.log(devices)
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

    const runMe = async (_string) => {
      const filter = {filter: { name : { match : _string }}};
      const result = await API.graphql(graphqlOperation(queries.searchDevices, filter));
      var numDevices = result.data.searchDevices.items.length;
      if(numDevices === 0){
        console.log('No Items');
      }else {
        console.log(numDevices + ' Items');
      }
      this.setState({items:result.data.searchDevices.items});
    }

    const DeviceView = ({ devices }) => (
      <div >
      <SearchBar getSearchString={this.runMe} />
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
      <Connect query={graphqlOperation(queries.listDevices, {limit:100})}
        subscription={graphqlOperation(subscriptions.onAnySubs)}
        onSubscriptionMsg={this.onNewItem}
        >
        {({ data: { listDevices }, loading, error }) => {
            if (error) return (<h3>Error</h3>);
            if (loading || !listDevices) return (<Loader/>);
            this.state.items = listDevices.items
            console.log('here');
            return (<DeviceView devices={this.state.items} /> );
        }}
      </Connect>
    );
  }
}

CardView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardView);
