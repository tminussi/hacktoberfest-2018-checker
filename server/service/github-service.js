const request = require('request');

const fetchPullRequestsOfUser = (username) => {
    return new Promise((resolve, reject) => {
        request.get({
            url: `https://api.github.com/search/issues?q=author:${username}+type:pr`,
            headers: {
                Accept: 'application/vnd.github.cloak-preview',
                'User-Agent': 'tminussi'
            }
        }, (err, data, body) => {
            if (responseContainsClientOrServerError(data.statusCode)) {
                const response = createErrorResponse(data.statusCode, body);
                return reject(response);
            } else {
                const jsonBody = JSON.parse(body);
                const validPullRequests = getValidPullRequestsFromResponseBody(jsonBody);
                let response = null;

                if (validPullRequests.length) {
                    response = createValidPullRequestsResponse(validPullRequests);
                } else if (!jsonBody.items.length) {
                    response = createNoPullRequestsResponse();
                } else {
                    response = createNoValidPullRequestsResponse(jsonBody);
                }
                return resolve(response);
            }
        });
    });
}

const responseContainsClientOrServerError = (statusCode) => statusCode >= 400;

const createErrorResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.parse(body)
    };
}

const createNoPullRequestsResponse = () => {
    return {
        valid_pull_requests_amount: 0
    };
}

const createValidPullRequestsResponse = (validPullRequests) => {
    return {
        valid_pull_requests_amount: validPullRequests.length,
        avatar: validPullRequests[0].user.avatar_url,
        pull_requests: validPullRequests.map(item => {
            return {
                url: item.html_url,
                state: item.state
            }
        }),
        message: createMessageByPullrequestQuantity(validPullRequests.length)
    };
}

const getValidPullRequestsFromResponseBody = (responseBody) => {
    return responseBody.items
        .filter(item => new Date(item.created_at).getTime() > new Date('2018-10-01T00:00:00Z').getTime())
        .filter(item => new Date(item.created_at).getTime() < new Date('2018-11-01T00:00:00Z').getTime());
}

const createNoValidPullRequestsResponse = (jsonBody) => {
    return {
        valid_pull_requests_amount: 0,
        avatar: jsonBody.items[0].user.avatar_url,
        message: createMessageByPullrequestQuantity(0)
    };
}

const createMessageByPullrequestQuantity = (quantity) => {
    if(!quantity) {
        return "You haven't created any Pull Requests so far. Start contributing to the Open Source Community and Win a T-Shirt at 5 PRs"
    } else if (quantity >= 1 && quantity <= 3) {
        return "Great job. The Open Source community is already thankful to you, but you can achieve more. Keep it up!"
    } else if (quantity === 4) {
        return "You are almost there! One more to go and you will be able to wear one of the coolest T-Shirts out there"
    } else {
        return "You did it! Congratulations! Time to rest and wait for your well deserved T-Shirt!"
    }
}

module.exports = {
    fetchPullRequestsOfUser, createMessageByPullrequestQuantity
}
