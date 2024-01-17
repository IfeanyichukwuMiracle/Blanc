const express = require("express");
const router = express.Router();
const Comment = require("../schema/comments");

//
// Comment on a product
router.post("/:productId", async (req, res) => {
  if (req.isAuthenticated()) {
    console.log("Here now");
    await Comment.create({
      commentBody: req.body.body,
      userId: req.user._id,
      productId: req.params.productId,
      createdAt: `${new Date().getTime().toLocaleString()} ${new Date()
        .getDate()
        .toLocaleString()}`,
    });
    return res.status(200).json({ msg: "Comment Added!" });
  }
  return res.status(200).json({ msg: "Login to add comment!" });
});

//
// Get all comments for a product
router.get("/:productId", async (req, res) => {
  const comments = await Comment.find({ productId: req.params.productId });
  // console.log(comments);
  return res.status(200).json({ comments });
});

module.exports = router;
