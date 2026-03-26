const categoryService = require("../service/category.service");
const Response = require("../utils/response");
const { controllerWrapper } = require("../utils/controller.wrapper");

class CategoryController extends Response {
  constructor() {
    super();
  }
  getCategoryById = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    this.GET(res, category, "Category retrieved successfully", null, null);
  });
  getAll = controllerWrapper(async (req, res) => {
    const { offset, limit } = req.query;
    const categories = await categoryService.getAll(offset, limit);
    this.GET(res, categories, "Categories retrieved successfully", null, null);
  });
  create = controllerWrapper(async (req, res) => {
    const { name, description } = req.body;
    const newCategory = await categoryService.create(name, description);

    this.CREATE(res, newCategory, "Category created successfully", null, null);
  });
  edit = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await categoryService.edit(id, name);
    this.UPDATE(
      res,
      updatedCategory,
      "Category updated successfully",
      null,
      null,
    );
  });
  remove = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const deletedCategory = await categoryService.remove(id);
    this.DELETE(
      res,
      deletedCategory,
      "Category deleted successfully",
      null,
      null,
    );
  });
}

module.exports = new CategoryController();
