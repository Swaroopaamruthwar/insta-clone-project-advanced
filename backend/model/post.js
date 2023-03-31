const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    PostImage: { type: String },
    PostImage_url: { type: String },
    author: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
