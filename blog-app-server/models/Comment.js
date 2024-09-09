// models/Comment.js
import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      maxlength: [1000, "Comment cannot be more than 1000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
