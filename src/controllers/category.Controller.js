const categoryService = require("../service/category.service");
const controllerWrapper = require("../utils/controller.wrapper");
const getCategoryById = controllerWrapper(async (req) => {
  const { id } = req.params;
  return await categoryService.getCategoryById(id);
});
const getAll = controllerWrapper(async () => {
  return await categoryService.getAll();
});
const create = controllerWrapper(async (req) => {
  const { name, description } = req.body;
  return await categoryService.create(name, description);
});
const edit = controllerWrapper(async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  return await categoryService.edit(id, name);
});
const remove = controllerWrapper(async (req) => {
  const { id } = req.params;
  return await categoryService.remove(id);
});

module.exports = {
  getAll,
  getCategoryById,
  create,
  edit,
  remove,
};
