// ========================================
// controllers/categoryController.js
// Controller = Nơi xử lý logic chính
// ========================================

const { categories, getNextId } = require("../data/CategoryData");

// --------------------------------------------------
// [C] CREATE - Tạo mới một category
// Method: POST /api/categories
// Body: { "name": "...", "description": "..." }
// --------------------------------------------------
const createCategory = (req, res) => {
  // Lấy dữ liệu từ body của request
  const { name, description } = req.body;

  // Kiểm tra bắt buộc phải có name
  if (!name) {
    return res.status(400).json({ message: "Tên category không được để trống!" });
  }

  // Tạo object category mới
  const newCategory = {
    id:          getNextId(),  // ID tự tăng
    name:        name,
    description: description || "", // Nếu không nhập thì để trống
  };

  // Thêm vào mảng dữ liệu
  categories.push(newCategory);

  // Trả về category vừa tạo, status 201 = Created
  res.status(201).json({
    message:  "Tạo category thành công!",
    category: newCategory,
  });
};

// --------------------------------------------------
// [R] READ ALL - Lấy danh sách tất cả categories
// Method: GET /api/categories
// --------------------------------------------------
const getAllCategories = (req, res) => {
  res.status(200).json({
    message:    "Lấy danh sách thành công!",
    total:      categories.length,
    categories: categories,
  });
};

// --------------------------------------------------
// [R] READ ONE - Lấy một category theo ID
// Method: GET /api/categories/:id
// --------------------------------------------------
const getCategoryById = (req, res) => {
  // Lấy id từ URL, ép sang số nguyên
  const id = parseInt(req.params.id);

  // Tìm trong mảng
  const category = categories.find((cat) => cat.id === id);

  // Nếu không tìm thấy
  if (!category) {
    return res.status(404).json({ message: `Không tìm thấy category có ID = ${id}` });
  }

  res.status(200).json({
    message:  "Tìm thấy category!",
    category: category,
  });
};

// --------------------------------------------------
// [U] UPDATE - Cập nhật category theo ID
// Method: PUT /api/categories/:id
// Body: { "name": "...", "description": "..." }
// --------------------------------------------------
const updateCategory = (req, res) => {
  const id = parseInt(req.params.id);

  // Tìm vị trí (index) trong mảng
  const index = categories.findIndex((cat) => cat.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Không tìm thấy category có ID = ${id}` });
  }

  // Lấy dữ liệu mới từ body, nếu không có thì giữ nguyên dữ liệu cũ
  const { name, description } = req.body;

  categories[index] = {
    ...categories[index],              // Giữ nguyên các trường cũ
    name:        name        || categories[index].name,
    description: description !== undefined ? description : categories[index].description,
  };

  res.status(200).json({
    message:  "Cập nhật category thành công!",
    category: categories[index],
  });
};

// --------------------------------------------------
// [D] DELETE - Xoá category theo ID
// Method: DELETE /api/categories/:id
// --------------------------------------------------
const deleteCategory = (req, res) => {
  const id = parseInt(req.params.id);

  const index = categories.findIndex((cat) => cat.id === id);

  if (index === -1) {
    return res.status(404).json({ message: `Không tìm thấy category có ID = ${id}` });
  }

  // Xoá 1 phần tử tại vị trí index
  const deleted = categories.splice(index, 1);

  res.status(200).json({
    message:  "Xoá category thành công!",
    category: deleted[0],
  });
};

// Xuất tất cả các hàm để dùng ở file khác
module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};