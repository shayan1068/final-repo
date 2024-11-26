
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
exports.uploadImages= catchAsyncErrors(
  async(req, res, next) =>{
    const files = [];

    for (const file of req.files) {
      files.push('http://localhost:3000' + '/images/' + file.filename);
    }
    res.status(200).json(files);
  }
)