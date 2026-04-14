class Response {
  constructor() {}

  send(res, statuscode, data, msg, options = null, error = null) {
    return res.status(statuscode).json({ data, msg, options, error });
  }
}

module.exports = Response;
