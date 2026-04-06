const category = require("./category.route");
const auth = require("./auth.route");
const user = require("./user.route");
const errorHandlingMiddleware = require("../middlewares/errorHandiling.middleware");
const intRoutes = (app) => {
  app.use(category);
  app.use(auth);
  app.use(user);
  app.use(errorHandlingMiddleware);
};
module.exports = intRoutes;
