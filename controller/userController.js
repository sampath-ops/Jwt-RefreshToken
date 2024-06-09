const catchAsync = require("../utils/catchAsync");
const ApiResponse = require("../utils/ApiResponse");

exports.getCurrentUser = catchAsync(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});
