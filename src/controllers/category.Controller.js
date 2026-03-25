const categoryService = require("../service/category.service");
//const controllerWrapper = require("../utils/controller.wrapper");

const BaseController = require("../utils/controller.wrapper");

class CategoryController extends BaseController {
  constructor() {
    super();
  }
  getCategoryById = this.controllerWrapper(async (req) => {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    return { action: "getCategoryById ", data: category };
  });
  getAll = this.controllerWrapper(async (req) => {
    const { offset, limit } = req.query;
    const categories = await categoryService.getAll(offset, limit);
    return { action: "getAll", data: categories };
  });
  create = this.controllerWrapper(async (req) => {
    const { name, description } = req.body;
    const newCategory = await categoryService.create(name, description);
    return { action: "create", data: newCategory };
  });
  edit = this.controllerWrapper(async (req) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await categoryService.edit(id, name);
    return { action: "edit", data: updatedCategory };
  });
  remove = this.controllerWrapper(async (req) => {
    const { id } = req.params;
    const deletedCategory = await categoryService.remove(id);
    return { action: "remove", data: deletedCategory };
  });
  getStatusCode(result) {
    if (result?.action === "create") {
      return 201;
    }

    return super.getStatusCode(result);
  }
}
/*const getCategoryById = controllerWrapper(async (req) => {
  const { id } = req.params;
  return await categoryService.getCategoryById(id);
});
const getAll = controllerWrapper(async (req) => {
  const { offset, limit } = req.query;
  
  return await categoryService.getAll(offset, limit);
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
*/
module.exports = new CategoryController();
