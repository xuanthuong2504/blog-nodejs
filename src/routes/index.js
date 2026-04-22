const category = require("./category.route");

const user = require("./user.route");
const apiDocs = require("./swagger.route");
const firebase = require("./firebase.route");
const errorHandlingMiddleware = require("../middlewares/errorHandiling.middleware");
const intRoutes = (app) => {
  app.use(category);

  app.use(user);
  app.use(apiDocs);
  app.use(firebase);

  app.use(errorHandlingMiddleware);
};
module.exports = intRoutes;
