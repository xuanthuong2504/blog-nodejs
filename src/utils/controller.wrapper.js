const controllerWrapper = (Fn) => {
  return async (req, res, next) => {
    try {
      const result = await Fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { controllerWrapper };
