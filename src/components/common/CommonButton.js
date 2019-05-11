import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class CommonButton extends Component {
  render() {
    return (
      <div>
        <Button variant="text" color={this.props.color} className="btn btn-default" onClick={this.props.handleClick}>
          {this.props.label}
          <Tooltip title={this.props.tip} >
          {this.props.button}
          </Tooltip>
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(CommonButton);
