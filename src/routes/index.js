const category = require("./category.route");
const user = require("./user.route");
const intRoutes = (app) => {
  app.use(category);
  app.use(user);
};
module.exports = intRoutes;
