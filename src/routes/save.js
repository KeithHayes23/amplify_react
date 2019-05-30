import React, { Component } from 'react';
import { ListItemIcon, ListItemText, Divider, IconButton, MenuList, MenuItem, Drawer } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import routes from '../routes/routes';

export class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.activeRoute = this.activeRoute.bind(this);
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <Drawer
          variant="permanent"
        >
          <MenuList>
            {routes.map((prop, key) => {
              return (
                <Link to={prop.path} style={{ textDecoration: 'none' }} key={key}>
                  <MenuItem selected={this.activeRoute(prop.path)}>
                    <ListItemIcon>
                      <prop.icon />
                    </ListItemIcon>
                    <ListItemText primary={prop.sidebarName} />
                  </MenuItem>
                </Link>
              );
            })}
          </MenuList>
        </Drawer>
      </div>
    );
  }
}

export default withRouter(Sidebar);
