import React, { Component } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CommonButton from '../common/CommonButton'
import { Auth } from 'aws-amplify';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});


export default class JSignOut extends Component {
  state = {
    info: {}
  }

  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  async componentDidMount() {
      await (await Auth.currentCredentials()).getPromise(); // Wait for credentials
      const info = await Auth.currentUserInfo()
      this.setState({ info })
    }

  signOut = async () => {
      await Auth.signOut()
    }

  render() {
    const { info } = this.state
    const { username } = info
    return (
      <CommonButton
          button={<AccountCircle/>}
          label={ username }
          color="default"
          tip="Signout"
          handleClick={this.signOut}
      />
    )
  }
}
