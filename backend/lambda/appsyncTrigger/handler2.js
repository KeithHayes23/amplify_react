const env = require('process').env;
const fetch = require('node-fetch');
const URL = require('url');
const AWS = require('aws-sdk');

AWS.config.update({
    region: env.AWS_REGION,
    credentials: new AWS.Credentials(env.AWS_ACCESS_KEY_ID, env.AWS_SECRET_ACCESS_KEY, env.AWS_SESSION_TOKEN)
});

/**
 *  Amazon Cognito trigger for post-authentication
 *
 * @param {event} the details from the Amazon Cognito session about the user
 * @param {context} the AWS Lambda context
 * @param {callback} Function to call when we are done with processing.
 */
exports.postauth = (event, context, callback) => {
    console.log(`Event = ${JSON.stringify(event, null, 2)}`);
    console.log(`Env = ${JSON.stringify(env, null, 2)}`);

    const AddUser = `mutation AddUser($userId: ID!, $userDetails: UserInput!) {
        addUser(userId: $userId, userDetails: $userDetails) {
            userId
            name
        }
    }`;

    const details = {
        userId: event.request.userAttributes.sub,
        userDetails: {
            name: event.request.userAttributes.name
        }
    };

    const post_body = {
        query: AddUser,
        operationName: 'AddUser',
        variables: details
    };
    console.log(`Posting: ${JSON.stringify(post_body, null, 2)}`);

    // POST the GraphQL mutation to AWS AppSync using a signed connection
    const uri = URL.parse(env.GRAPHQL_API);
    const httpRequest = new AWS.HttpRequest(uri.href, env.REGION);
    httpRequest.headers.host = uri.host;
    httpRequest.headers['Content-Type'] = 'application/json';
    httpRequest.method = 'POST';
    httpRequest.body = JSON.stringify(post_body);

    AWS.config.credentials.get(err => {
        const signer = new AWS.Signers.V4(httpRequest, "appsync", true);
        signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

        const options = {
            method: httpRequest.method,
            body: httpRequest.body,
            headers: httpRequest.headers
        };

        fetch(uri.href, options)
            .then(res => res.json())
            .then(json => {
                console.log(`JSON Response = ${JSON.stringify(json, null, 2)}`);
                callback(null, event);
            })
            .catch(err => {
                console.error(`FETCH ERROR: ${JSON.stringify(err, null, 2)}`);
                callback(err);
            });
    });
}
