module.exports = {
  get: jest.fn(({ url }, cb) => {
    return cb(null, { statusCode: 200 }, JSON.stringify({ items: [] }))
  })
}
