// utils/controllerWrapper.js
class BaseController {
  controllerWrapper(Fn) {
    return async (req, res, next) => {
      try {
        const result = await Fn(req, res, next);
        res
          .status(this.getStatusCode(result))
          .json(this.formatResponse(result));
      } catch (error) {
        next(error);
      }
    };
  }

  getStatusCode(result) {
    return result?.statusCode || 200;
  }
  formatResponse(result) {
    return {
      result: "",
      data: result.data,
      error: "",
      msg: "",
      options: "",
    };
  }
}
module.exports = BaseController;
