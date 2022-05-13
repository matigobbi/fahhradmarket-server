
const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    imageUrl: String,  
    title: String,
    type: String,
    description: String,
    framesize: String,
    framematerial: String,
    brakes: String,
    tubes: String,
    years: String,
    zipcode: String,
    city: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;