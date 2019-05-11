import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EditItem from './editItem'
import DeleteItem from './deleteItem'
import { graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';

import Loader from './Loader';

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



class ListItems extends Component {

  state = {
    items: []
  }

  componentDidMount = () => {
  //  this.getItems()
  }

//  getItems = () => {
//    API.graphql(graphqlOperation(queries.listItems))
//    .then(data => this.setState({items: data.data.listItems.items}))
//  };
  onNewItem = (prevQuery, newData) => {
    console.log(prevQuery);
      let updatedQuery = Object.assign({}, prevQuery);
      updatedQuery.listItems.items = prevQuery.listItems.items.concat([newData.onCreateItem]);
      return updatedQuery;
  }
  onDeleteItem = (prevQuery, newData) => {
    console.log(prevQuery);
    //let updatedQuery = Object.assign({}, prevQuery);
    //updatedQuery.listItems.items = prevQuery.listItems.items.delete
  }

  render(){
    const { classes } = this.props;
    const { items } = this.state;
    console.log(items)

    const ItemView = ({ items }) => (
      <div className={classes.root}>
      <Grid container className={classes.root} spacing={16}>
          {items.map(item => (
             <Grid key={item.id} item>
                 <Card className={classes.card}>
                   <CardContent>
                     <Typography className={classes.title} color="textSecondary" gutterBottom>
                       {item.name}
                     </Typography>
                      <Typography component="p">
                      ${item.price}
                      </Typography>
                      <br />
                      <Typography component="p">
                      {item.description}
                      </Typography>
                  </CardContent>
                    <CardActions>
                      <EditItem currentItem={item}/>
                      <DeleteItem currentItem={item}/>
                   </CardActions>
                 </Card>
               </Grid>
             ))}
         </Grid>
      </div>
    );
    return (
      <Connect query={graphqlOperation(queries.listItems, {limit:100})}
        subscription={graphqlOperation(subscriptions.onCreateItem)}
        onSubscriptionMsg={this.onNewItem}
        >
        {({ data: { listItems }, loading, error }) => {
            if (error) return (<h3>Error</h3>);
            if (loading || !listItems) return (<Loader/>);
            return (<ItemView items={listItems.items} /> );
        }}
      </Connect>
    );
  }
}

ListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItems);
