


const express    = require("express");
const router     = express.Router();
const controller = require("../app/controllers/CategoryController");


router.get(    "/",    controller.getAllCategories);  // Lấy tất cả
router.get(    "/:id", controller.getCategoryById);  // Lấy 1 theo ID
router.post(   "/",    controller.createCategory);   // Tạo mới
router.put(    "/:id", controller.updateCategory);   // Cập nhật
router.delete( "/:id", controller.deleteCategory);   // Xoá

module.exports = router;