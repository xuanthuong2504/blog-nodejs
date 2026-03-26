const category = require("./category.route");
const user = require("./user.route");
const errorHandlingMiddleware = require("../middlewares/errorHandiling");
const intRoutes = (app) => {
  app.use(category);
  app.use(user);
  app.use(errorHandlingMiddleware);
};
module.exports = intRoutes;
