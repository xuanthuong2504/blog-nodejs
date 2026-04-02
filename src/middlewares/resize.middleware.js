const sharp = require("sharp");
const path = require("path");

const resizeimage = async (req, res, next) => {
  const files = req.files || [];

  try {
    for (const file of files) {
      const filePath = path.join(file.destination, file.filename);

      await sharp(filePath)
        .resize(360, 720)
        .toFile(filePath + "_resized" + path.extname(file.filename));
    }
  } catch (error) {
    return next(error);
  }

  return next();
};

module.exports = resizeimage;
