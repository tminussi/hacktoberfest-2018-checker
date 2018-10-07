const request = require("request");
const i18n = require("../locales");

const fetchPullRequests = username => {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: `https://api.github.com/search/issues?q=author:${username}+type:pr`,
        headers: {
          Accept: "application/vnd.github.cloak-preview",
          "User-Agent": "tminussi"
        }
      },
      (err, data, body) => {
        if (data.statusCode >= 400) {
          return reject({
            statusCode: data.statusCode,
            body: JSON.parse(body)
          });
        }
        const jsonBody = JSON.parse(body);
        if (!jsonBody.items.length) {
          return resolve({
            valid_pull_requests_amount: 0
          });
        }
        const validPullRequests = jsonBody.items
          .filter(
            item =>
              new Date(item.created_at).getTime() >
              new Date("2018-10-01T00:00:00Z").getTime()
          )
          .filter(
            item =>
              new Date(item.created_at).getTime() <
              new Date("2018-11-01T00:00:00Z").getTime()
          );
        if (validPullRequests.length) {
          return resolve({
            valid_pull_requests_amount: validPullRequests.length,
            avatar: validPullRequests[0].user.avatar_url,
            pull_requests: validPullRequests.map(item => {
              return {
                url: item.html_url,
                state: item.state
              };
            }),
            message: createMessage(validPullRequests.length)
          });
        }
        return resolve({
          valid_pull_requests_amount: 0,
          avatar: jsonBody.items[0].user.avatar_url,
          message: createMessage(0)
        });
      }
    );
  });
};

const createMessage = quantity => {
  if (!quantity) {
    return i18n.t("no_pull_requests");
  } else if (quantity >= 1 && quantity <= 3) {
    return i18n.t("keep_it_up");
  } else if (quantity === 4) {
    return i18n.t("almost_there");
  } else {
    return i18n.t("congratulations");
  }
};

module.exports = {
  fetchPullRequests: fetchPullRequests,
  createMessage
};
