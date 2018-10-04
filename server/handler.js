"use strict";
const githubService = require("./service/github-service");
module.exports.index = async (event, context, callback) => {
  try {
    return callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(
        await githubService.fetchPullRequests(
          event.queryStringParameters.username
        )
      )
    });
  } catch (e) {
    return callback(null, {
      statusCode: e.statusCode,
      body: JSON.stringify(e.body)
    });
  }
};

module.exports.locale = (event, context, callback) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json"
  };
  try {
    const eventLocale = event.pathParameters.lng;
    return callback(null, {
      statusCode: 200,
      headers,
      body: JSON.stringify(require(`./locales/${eventLocale}/client.json`))
    });
  } catch (err) {
    return callback(null, {
      statusCode: 301,
      headers,
      body: JSON.stringify(require("./locales/en/client.json"))
    });
  }
};
