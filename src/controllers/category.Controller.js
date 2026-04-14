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
    const userId = req.user?.userId;
    // console.log("User ID in controller:", userId);
    const category = await categoryService.getCategoryById(id, userId);
    this.send(res, 200, category, SUCCESS_CATE, null, null);
  });
  getAll = controllerWrapper(async (req, res) => {
    const userId = req.user?.userId;
    const { categories, total, totalpage } = await categoryService.getAll(
      req.query,
      userId,
    );
    this.send(
      res,
      200,
      { categories, total, totalpage },
      SUCCESS_CATE,
      null,
      null,
    );
  });
  create = controllerWrapper(async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user?.userId;
    const images = (req.files || []).map((file) => {
      return file.filename;
    });

    try {
      const newCategory = await categoryService.create(
        name,
        description,
        images,
        userId,
      );

      this.send(res, 201, newCategory, SUCCESS_CATE, null, null);
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
    const { name, State } = req.body;
    const userId = req.user?.userId;

    const updatedCategory = await categoryService.edit(id, name, State, userId);
    this.send(res, 200, updatedCategory, SUCCESS_CATE, null, null);
  });
  remove = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const deletedCategory = await categoryService.remove(id, userId);
    this.send(res, 200, deletedCategory, SUCCESS_CATE, null, null);
  });
  removeimage = controllerWrapper(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.userId;
    const result = await categoryService.removeimage(id, userId);
    this.send(res, 200, result, SUCCESS_CATE, null, null);
  });
}

module.exports = new CategoryController();
