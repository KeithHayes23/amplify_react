import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Grid'
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
      items: []
    }
  //  this.handleSearch = this.handleSearch.bind(this);
  }

    runMe(_string) {
      console.log(_string);
      this.handleSearch();
    }
//  getItems = () => {
//    const filter = {filter:{name:{eq:"LightBulb2"}}};
//    API.graphql(graphqlOperation(queries.searchDevices,filter))
//    .then(data => this.setState({items: data.data.listDevices.items}))
//  };

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
    }
    return updatedQuery;
  }

  render(){
    const { classes } = this.props;
    const { devices } = this.state;

    const handleSearch = async (event) => {
        console.log(event);
        const filter = {filter: { name : { match : "LightBulb2" }}};
        const result = await API.graphql(graphqlOperation(queries.searchDevices, filter));
        this.setState({items:result.data.searchDevices.items});
        if(result.data.searchDevices.items.length == 0){
          console.log(result.data.searchDevices.items.length);
          //this.setState({searchResults:[{note:"No Match: Clear the search to go back to your Notes"}]});
        };
      }

    const DeviceView = ({ devices }) => (
      <div >
      <SearchBar getSearchString={() => handleSearch()} />
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
            this.items = listDevices.items

            return (<DeviceView devices={this.items} /> );
        }}
      </Connect>
    );
  }
}

CardView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardView);
