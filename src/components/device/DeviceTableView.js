import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

import {
        Grid,
        VirtualTable, TableHeaderRow, TableFilterRow, TableSelection, TableGroupRow,
        GroupingPanel, DragDropProvider, TableColumnReordering, Toolbar, SearchPanel,
      } from '@devexpress/dx-react-grid-material-ui';

import {
         SortingState, SelectionState, FilteringState, GroupingState, SearchState,
         IntegratedFiltering, IntegratedGrouping, IntegratedSorting, IntegratedSelection,
       } from '@devexpress/dx-react-grid';

import {API, graphqlOperation }  from "aws-amplify";
import * as queries from '../../graphql/queries';

class DeviceTableView extends Component {
  constructor(){
    super();
    this.state = {
      devices: [],
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'group', title: 'Group' },
        { name: 'deviceId', title: 'Device Id' },
        { name: 'serialNumber', title: 'Serial Number' },
        { name: 'activated', title: 'Activated' },
        { name: 'type', title: 'Type' },
      ],
      loading: true,
      nextToken: null,
      totalCount: 0,
      pageSize: 1000,
    }
  }
  componentDidMount() {
    this.listDevices();
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
    const { devices,
            columns,
            pageSize,
            loading,
          } = this.state;
    return (
      <Paper style={{ position: 'relative' }}>
        <Grid
          rows={devices}
          columns={columns}>

          <SearchState />
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
          <Toolbar />
          <SearchPanel />

        </Grid>

      </Paper>
    );
  }
}

export default DeviceTableView;
