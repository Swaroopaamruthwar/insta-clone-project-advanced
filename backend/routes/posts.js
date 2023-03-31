const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { body, param, validationResult } = require("express-validator");
// router.use(express.static(__dirname+"./public/"));
router.use("/PostImage", express.static("public/images"));
router.use(bodyparser());
router.use(bodyparser.urlencoded({ extended: false }));
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    posts,
  });
});
var fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

router.post("/posts", upload.single("PostImage"), async (req, res) => {
  console.log("dffsg");
  console.log(req.body.author);
  try {
    const post = await Post.create({
      PostImage_url: `http://localhost:5000/PostImage/${req.file.filename}`,
      PostImage: req.file.filename,
      author: req.body.author,
      location: req.body.location,
      description: req.body.description,
      date: req.body.date,
    });
    console.log(post);
    res.status(200).json({
      status: " post created  successfully",
      data: post,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = router;
