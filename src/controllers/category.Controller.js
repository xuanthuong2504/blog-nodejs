const categoryService = require("../service/category.service");
const Response = require("../utils/response.utils");
const { controllerWrapper } = require("../utils/controller.utils");
const { SUCCESS_CATE } = require("../constants/msg.constants");

class CategoryController extends Response {
  constructor() {
    super();
  }
  getCategoryById = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    this.GET(res, category, SUCCESS_CATE, null, null);
  });
  getAll = controllerWrapper(async (req, res) => {
    const { offset, limit } = req.query;
    const { categories, total, totalpage } = await categoryService.getAll(
      offset,
      limit,
    );
    this.GET(res, { categories, total, totalpage }, SUCCESS_CATE, null, null);
  });
  create = controllerWrapper(async (req, res) => {
    const { name, description } = req.body;
    const images = (req.files || []).map((file) => {
      return `/img/categories/${file.filename}`;
    });
    const newCategory = await categoryService.create(name, description, images);

    this.POST(res, newCategory, SUCCESS_CATE, null, null);
  });
  edit = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await categoryService.edit(id, name);
    this.PUT(res, updatedCategory, SUCCESS_CATE, null, null);
  });
  remove = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const deletedCategory = await categoryService.remove(id);
    this.DELETE(res, deletedCategory, SUCCESS_CATE, null, null);
  });
}

module.exports = new CategoryController();
