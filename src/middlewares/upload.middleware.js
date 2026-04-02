const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../public/img/categories");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const randomString = crypto.randomBytes(8).toString("hex");

    const ext = path.extname(file.originalname);
    const filename = randomString + ext;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpg|jpeg|png|webp/;
  const mimetype = filetypes.test(file.mimetype); // kiểm tra loại file
  const ext = filetypes.test(path.extname(file.originalname).toLowerCase()); // lấy đuổi file
  if (mimetype && ext) {
    return cb(null, true);
  }
  cb(new Error("Chỉ chấp nhận file ảnh: " + filetypes));
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).array("images", 10);
module.exports = upload;
