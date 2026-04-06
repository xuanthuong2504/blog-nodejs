const categoryService = require("../service/category.service");
const Response = require("../utils/response.utils");
const { controllerWrapper } = require("../utils/controller.utils");
const { SUCCESS_CATE } = require("../constants/msg.constants");
const fs = require("fs");
const path = require("path");

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
    const { categories, total, totalpage } = await categoryService.getAll(
      req.query,
    );
    this.GET(res, { categories, total, totalpage }, SUCCESS_CATE, null, null);
  });
  create = controllerWrapper(async (req, res) => {
    const { name, description } = req.body;
    const images = (req.files || []).map((file) => {
      return file.filename;
    });
    console.log(images);

    try {
      const newCategory = await categoryService.create(
        name,
        description,
        images,
      );

      this.POST(res, newCategory, SUCCESS_CATE, null, null);
    } catch (error) {
      const uploadDir = path.join(__dirname, "../public/img/categories");

      for (const file of req.files || []) {
        const filePath = path.join(uploadDir, file.filename);
        try {
          await fs.promises.unlink(filePath);
        } catch (_) {}
      }

      throw error;
    }
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
  removeimage = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const result = await categoryService.removeimage(id);
    this.DELETE(res, result, SUCCESS_CATE, null, null);
  });
}

module.exports = new CategoryController();
