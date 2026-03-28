class Response {
  constructor() {}

  GET(res, data, msg, options = null, error = null) {
    return res.status(200).json({ data, msg, options, error });
  }

  POST(res, data, msg, options = null, error = null) {
    return res.status(201).json({ data, msg, options, error });
  }

  PUT(res, data, msg, options = null, error = null) {
    return res.status(200).json({ data, msg, options, error });
  }

  DELETE(res, data, msg, options = null, error = null) {
    return res.status(200).json({ data, msg, options, error });
  }
}

module.exports = Response;
