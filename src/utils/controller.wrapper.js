// utils/controllerWrapper.js
const controllerwrapper = (Fn) => async(req, res, next) => {
  
    try {
      const result = await Fn(req, res);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
};


module.exports = controllerwrapper;
