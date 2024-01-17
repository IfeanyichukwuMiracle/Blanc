const express = require("express");
const router = express.Router();
const { upload, cloudinary } = require("../config/uploadConfig");
const Product = require("../schema/products");
const User = require("../schema/users");

//
// Add a new product
router.post("/add/:userId", upload.single("productImg"), async (req, res) => {
  if (req.isAuthenticated()) {
    const admin = await User.findOne({ _id: req.params.userId });

    if (admin.isAdmin) {
      const { productName, productDesc, productPrice } = req.body;

      if (productName && productDesc && productPrice) {
        cloudinary.uploader.upload(req.file?.path, async (err, result) => {
          if (err) {
            console.log(err);
            return;
          }
          await Product.create({
            productName,
            productDesc,
            productPrice,
            productImg: result.url || "",
          });
          return res.status(200).json({ msg: "Product Added!" });
        });
      } else {
        return res
          .status(200)
          .json({ msg: "Fill all fields before submitting form" });
      }
    } else {
      return res.status(200).json({ msg: "Only admins!" });
    }
  } else {
    return res
      .status(200)
      .json({ msg: "Only admins can perform this action!" });
  }
});

//
// Remove an existing product
router.delete("/remove/:userId/:productId", async (req, res) => {
  if (req.isAuthenticated()) {
    const admin = await User.findOne({ _id: req.params.userId });
    if (admin.isAdmin) {
      try {
        await Product.findOneAndDelete({ _id: req.params.productId });
        return res.status(200).json({ msg: "Product Removed!" });
      } catch (error) {
        console.log(error);
        return;
      }
    }
    return res
      .status(400)
      .json({ msg: "Only admins can perform this action!" });
  }
  return res.status(400).json({ msg: "Only admins can perform this action!" });
});

//
// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  // console.log(products);
  return res.status(200).json(products);
});

//
// Get single product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    return res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    return;
  }
});

module.exports = router;
