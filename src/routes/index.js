const category = require("./category.route");
const intRoutes = (app) => {
  app.use( category);
};
module.exports = intRoutes;
