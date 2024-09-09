// models/BlogPost.js
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const BlogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    coverImage: {
      type: String,
      default: "default-cover.jpg",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    trendingScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Add text index for searching
BlogPostSchema.index({ title: "text", content: "text", tags: "text" });

// Add pagination plugin
BlogPostSchema.plugin(mongoosePaginate);

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

export default BlogPost;
