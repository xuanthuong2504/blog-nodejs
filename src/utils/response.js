class Response {
  constructor() {}

  GET(res, data, msg = "Success", options = null, error = null) {
    return res.status(200).json({ data, msg, options, error });
  }

  CREATE(
    res,
    data,
    msg = "Created successfully",
    options = null,
    error = null,
  ) {
    return res.status(201).json({ data, msg, options, error });
  }

  UPDATE(
    res,
    data,
    msg = "Updated successfully",
    options = null,
    error = null,
  ) {
    return res.status(200).json({ data, msg, options, error });
  }

  DELETE(
    res,
    data,
    msg = "Deleted successfully",
    options = null,
    error = null,
  ) {
    return res.status(200).json({ data, msg, options, error });
  }
}

module.exports = Response;
