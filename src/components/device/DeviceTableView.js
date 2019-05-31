import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
        Grid,
        VirtualTable, TableHeaderRow, TableFilterRow, TableSelection,
      } from '@devexpress/dx-react-grid-material-ui';

import {
         SelectionState, FilteringState, GroupingState,
         IntegratedFiltering, IntegratedGrouping, IntegratedSelection,
       } from '@devexpress/dx-react-grid';

import {API, graphqlOperation }  from "aws-amplify";
import * as queries from '../../graphql/queries';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '5px'
  },
};

class DeviceTableView extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'group', title: 'Group' },
        { name: 'deviceId', title: 'Device Id' },
        { name: 'serialNumber', title: 'Serial Number' },
        { name: 'activated', title: 'Activated' },
        { name: 'type', title: 'Type' },
      ],
      pageSize: 1000,
    }
  }
  componentDidMount() {

  }

  listDevices = async () => {
      const devices = await API.graphql(graphqlOperation(queries.listDevices,
        { limit:this.state.pageSize,
          nextToken:this.state.nextToken
        }));
      console.log(devices);
      const {items, nextToken } = devices.data.listDevices;
      this.setState({devices:items, nextToken:nextToken});
  }

  render() {
    const { columns } = this.state;
    const { classes, devices } = this.props;

    return (
        <Grid container className={classes.root} spacing={16}
          rows={devices}
          columns={columns}>
          <SelectionState />
          <IntegratedSelection />
          <FilteringState />
          <IntegratedFiltering />
          <GroupingState/>
          <IntegratedGrouping />
          <VirtualTable />
          <TableHeaderRow/>
          <TableSelection showSelectAll />
          <TableFilterRow showFilterSelector />

        </Grid>
    );
  }
}

export default withStyles(styles)(DeviceTableView);
