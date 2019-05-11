import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddItem from '../addItem'
import Button from '@material-ui/core/Button';

class GridMenu extends Component {
  state = {
   anchorEl: null,
  };

   handleClick = event => {
     console.log(event)
     this.setState({ anchorEl: event.currentTarget });
   };

   handleClose = () => {
     this.setState({ anchorEl: null });
   };
  render(){
      const { anchorEl } = this.state;

      return (
        <div >
          <Button
          variant="outlined"
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            Actions
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleClose}><AddItem/></MenuItem>
          </Menu>
        </div>
      );
    }
}

export default GridMenu;
