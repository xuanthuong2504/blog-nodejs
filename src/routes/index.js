const category = require("./category.route");
const intRoutes = (app) => {
  app.use("/api/", category);
};
module.exports = intRoutes;
