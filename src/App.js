import React from 'react';
import './App.css';
import Home from './screens/home'

import Amplify from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

function App() {
  return (
        <Home />
  );
}

export default withAuthenticator(App, { includeGreetings: false });
