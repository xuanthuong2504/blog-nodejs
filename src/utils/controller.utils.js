const controllerWrapper = (Fn) => {
  return async (req, res, next) => {
    try {
      await Fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { controllerWrapper };
