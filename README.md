
# What is this?

This is an wip project that uses [AWS Amplify](https://aws-amplify.github.io/) for the backend
and reactjs for the client. Graphql and AWS Appsync is the glue to connects the frontend to the backend. The current destination is unknown at this point. I'm just cutting my teeth on reactjs and needed a project to practice.
Amplify also supports Vue, Angular, React Native and a few other client frameworks.

Amplify is used to setup Authentication, Appsync, and Storage in the cloud.

# Architecture

<img src="assets/amplify_react_arch.png" width="600">

# Getting things setup
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Dependencies
```
yarn global add @aws-amplify/cli
yarn add aws-amplify aws-amplify-react
```
### UI Framework
Currently I'm using Material UI

```
yarn add @material-ui/core
yarn add #material-ui/icons
```

### Setup AWS Backend
You need an AWS account to get the backend setup. Costs are minimal since I'm striving for a serverless architecture.
Check out [AWS Amplify](https://aws-amplify.github.io/docs/js/react) to see the details on how this works.

This command will setup an AWS user for amplify to build the cloud resources. Just follow along.
```
amplify configure
```

This command initializes the project. Framework to use, editor etc. Were using react for this project.
```
amplify init
```

During the next step it will ask you Do you have an annotated GraphQL schema? (y/N) enter yes
For the file use saveme.graphql
This will change over time and I have it in the root directory of this project because if you run amplify delete it will delete the amplify directory that contains schema.graphql that amplify uses to setup appsync.
```
amplify add api
```

This command builds the backend. Check out Cloudformation to see what it is doing.
```
amplify push
```
One last thing I need to resolve. Using the amplify <Connect/> component only allow for 1 subscription. I am interested in Creates, Updates and Deletes so I add an consolidated subscription that notify's the app if any of those condition occur.
Has to be a better way but until I figure that out here's a work around.

In the aws console open the appsync service select schema, find the type Subscriptions part and a onAnySubs item.
```
type Subscription {
	...
	onAnySubs: Item
		@aws_subscribe(mutations: ["createItem","updateItem","deleteItem"])
}
```

Add this to src/graphql/subscriptions.js
```
export const onAnySubs = `subscription onAnySubs {
  onDeleteItem {
    id
    name
    price
    description
  },
  onUpdateItem {
    id
    name
    price
    description
  },
  onCreateItem {
    id
    name
    price
    description
  }
}
`;
```

### Runs the app in the development mode.<br>
Setup account, login, logout, forgot password, MFA is all handled for you by amplify.
```
amplify serve
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Create an account, validate with MFA and login.

<img src="assets/login_screen.png" width="600">

### This sets up hosting on cloudfront or from an S3 Bucket

```
amplify add hosting
amplify hosting configure
amplify publish
```


### Deletes all backend resources and cleans up local archive
```
amplify delete
```
