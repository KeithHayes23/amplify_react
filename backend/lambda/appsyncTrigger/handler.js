const AWS = require('aws-sdk');
const axios = require('node_modules/axios/lib/axios.js');

exports.handler = async (event) => {

    AWS.config.update({
      region: 'us-****-*',
      credentials: new AWS.Credentials({
         accessKeyId: "*******",
         secretAccessKey: "***********",
      })
    });

    const result = await invokeAppSync({ user1: 'dummy1', user2: 'dummy2' });

    console.log(result)

    return result.data;
};


const invokeAppSync = async ({ user1, user2 }) => {
    let req = new AWS.HttpRequest('https://****.appsync-api.us-****-1.amazonaws.com/graphql', 'us-****-*');
    req.method = 'POST';
    req.headers.host = '******.appsync-api.us-****-*.amazonaws.com';
    req.headers['Content-Type'] = 'multipart/form-data';
    req.body = JSON.stringify({
        "query":"mutation ($input: CreateMatchInput!) { createMatch(input: $input){  matchId } }",
            "variables": {
                "input": {
                    "matchId": "dummyid",
                    "matchUser1": user1,
                    "matchUser2": user2,
                    "timestamp":  `${Date.now()}`
                }
            }
    });

    let signer = new AWS.Signers.V4(req, 'appsync', true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    const result = await axios({
        method: 'post',
        url: 'https://*******.appsync-api.us-****-*.amazonaws.com/graphql',
        data: req.body,
        headers: req.headers
    });

    return result;
});
