const mockRequest = require('request');
const { fetchPullRequestsOfUser, createMessageByPullrequestQuantity } = require('../service/github-service');

describe('Github service - fetchPullRequests', () => {
  it('should reject the request if status code >= 400', async () => {
    mockRequest.get.mockImplementationOnce(({}, cb) => {
      const data = { statusCode: 401 };
      const body = JSON.stringify({});
      return cb(null, data, body);
    });

    await expect(fetchPullRequestsOfUser('chgasparoto')).rejects.toEqual({
      body: {},
      statusCode: 401,
    });
  });

  it('should return zero if no PR were made yet', async () => {
    mockRequest.get.mockImplementationOnce(({}, cb) => {
      const data = { statusCode: 200 };
      const body = JSON.stringify({ items: [] });
      return cb(null, data, body);
    });

    const response = await fetchPullRequestsOfUser('chgasparoto');

    expect(response).toBeObject().toContainKey('valid_pull_requests_amount');
    expect(response.valid_pull_requests_amount).toEqual(0);
  });

  it('should return an object with valid PRs data', async () => {
    mockRequest.get.mockImplementationOnce(({}, cb) => {
      const data = { statusCode: 200 };
      const body = JSON.stringify({
        items: [{
          created_at: '2018-10-02T00:00:00Z',
          html_url: '',
          state: '',
          user: {
            avatar_url: ''
          }
        }]
      });
      return cb(null, data, body);
    });

    const response = await fetchPullRequestsOfUser('chgasparoto');

    expect(response).toBeObject().toContainAllKeys([
      'valid_pull_requests_amount',
      'avatar',
      'pull_requests',
      'message'
    ]);
    expect(response.valid_pull_requests_amount).toBeNumber().toEqual(1);
    expect(response.avatar).toBeString();
    expect(response.message).toBeString();
    expect(response.pull_requests).toBeArray();
    expect(response.pull_requests[0]).toBeObject().toContainAllKeys(['url', 'state']);
  });

  it('should return an object with no valid PRs data', async () => {
    mockRequest.get.mockImplementationOnce(({}, cb) => {
      const data = { statusCode: 200 };
      const body = JSON.stringify({
        items: [{
          created_at: '2018-11-02T00:00:00Z',
          html_url: '',
          state: '',
          user: {
            avatar_url: ''
          }
        }]
      });
      return cb(null, data, body);
    });

    const response = await fetchPullRequestsOfUser('chgasparoto');

    expect(response).toBeObject().toContainAllKeys([
      'valid_pull_requests_amount',
      'avatar',
      'message'
    ]);
    expect(response.valid_pull_requests_amount).toBeNumber().toEqual(0);
    expect(response.avatar).toBeString();
    expect(response.message).toBeString().toEqual(`You haven't created any Pull Requests so far. Start contributing to the Open Source Community and Win a T-Shirt at 5 PRs`);
  });
});

describe('createMessage', () => {
  it('should return a message if quantity is 0', () => {
    expect(createMessageByPullrequestQuantity(0)).toEqual(`You haven't created any Pull Requests so far. Start contributing to the Open Source Community and Win a T-Shirt at 5 PRs`);
  });

  it('should return a message if quantity is between 1 and 3', () => {
    expect(createMessageByPullrequestQuantity(2)).toEqual(`Great job. The Open Source community is already thankful to you, but you can achieve more. Keep it up!`);
  });

  it('should return a message if quantity is 4', () => {
    expect(createMessageByPullrequestQuantity(4)).toEqual(`You are almost there! One more to go and you will be able to wear one of the coolest T-Shirts out there`);
  });

  it('should return a message if quantity is >= 5', () => {
    expect(createMessageByPullrequestQuantity(5)).toEqual(`You did it! Congratulations! Time to rest and wait for your well deserved T-Shirt!`);
  });
})
