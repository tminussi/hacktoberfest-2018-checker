'use strict';
const githubService = require('./service/github-service');
module.exports.index = async (event, context, callback) => {
  try {
    return callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(await githubService.fetchPullRequests(event.queryStringParameters.username))
    });
  } catch (e) {
    return callback(null, {
      statusCode: e.statusCode,
      body: JSON.stringify(e.body)
    });
  }
};
