const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const resizeimage = async (req, res, next) => {
  const files = req.files || [];

  try {
    for (const file of files) {
      const originalPath = path.join(file.destination, file.filename); //public/img/categories/filename.jpg

      const ext = path.extname(file.filename); // đuôi file
      const basename = path.basename(file.filename, ext); // tên file k đuôi

      const resizedFilename = `${basename}_resized${ext}`; // ghép tên file mới: filename_resized.jpg
      const resizedPath = path.join(file.destination, resizedFilename); // public/img/categories/filename_resized.jpg

      await sharp(originalPath).resize(360, 720).toFile(resizedPath); // resize ảnh và lưu thành file mới

      // Xóa file gốc để mỗi ảnh chỉ còn 1 file
      await fs.promises.unlink(originalPath).catch(() => {});

      // Cập nhật lại filename để controller lưu đúng tên file resized
      file.filename = resizedFilename;
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = resizeimage;
