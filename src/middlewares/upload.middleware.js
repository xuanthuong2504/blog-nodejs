const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/img/categories"));
  },
  filename: function (req, file, cb) {
    const randomString = crypto.randomBytes(8).toString("hex");

    const ext = path.extname(file.originalname);
    const filename = randomString + ext;
    cb(null, filename);
  },
});
const allowedFormats = ["jpg", "jpeg", "png", "webp"];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase().replace(".", ""); // ví dụ "jpg"
  const isAllowed = allowedFormats.includes(ext);

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ chấp nhận file ảnh: " + allowedFormats.join(", ")));
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
module.exports = upload;
