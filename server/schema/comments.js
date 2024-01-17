const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commentBody: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  productId: {
    type: String,
  },
  createdAt: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
