import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import AddDevice from './addDevice';
import DeviceMenu from './DeviceMenu'
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});


class DeviceSearchBar extends Component {
  state = {
    showRemoveIcon: false,
    changeView: false
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleListView = this.handleListView.bind(this);
    this.handleCardView = this.handleCardView.bind(this);
  }

  handleChange(event){
    event.preventDefault()
    const { target: { value } } = event;
    this.props.getSearchString(value);
  }

  handleCardView(event){
    console.log("card")
    this.props.handleSwitchView('CARD_VIEW')
  }

  handleListView(event){
    console.log("list")
    this.props.handleSwitchView('LIST_VIEW')
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid >
          <Toolbar variant="dense">
            <AddDevice/>
            <IconButton className={classes.button} onClick={this.handleListView} aria-label="ListView" color="primary">
              <ViewListIcon />
            </IconButton>
            <IconButton className={classes.button} onClick={this.handleCardView} aria-label="CardView" color="primary">
              <ViewModuleIcon />
            </IconButton>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon color='primary'/>
              </div>
              <InputBase

                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={this.handleChange}
              />
            </div>
          </Toolbar>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(DeviceSearchBar);
