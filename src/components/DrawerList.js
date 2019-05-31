import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeviceIcon from '@material-ui/icons/DevicesOther';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  });

function DrawerList(props) {


  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  const { classes } = props;
  return (
    <List
      component="nav"
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboards" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <DeviceIcon />
        </ListItemIcon>
        <ListItemText primary="Devices" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ViewList />
            </ListItemIcon>
            <ListItemText primary="List View" />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ViewModule />
            </ListItemIcon>
            <ListItemText primary="Card View" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default withStyles(styles)(DrawerList);
