// controllers/commentController.js
import Comment from "../models/Comment.js";
import BlogPost from "../models/BlogPost.js";

export const createComment = async (req, res) => {
  try {
    const { content, blogPostId } = req.body;
    const comment = new Comment({
      content,
      author: req.user._id,
      blogPost: blogPostId,
    });
    const savedComment = await comment.save();

    // Add comment to the blog post
    await BlogPost.findByIdAndUpdate(blogPostId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { blogPostId } = req.params;
    const comments = await Comment.find({ blogPost: blogPostId })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own comments" });
    }

    comment.content = content;
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (
      comment.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "You can only delete your own comments" });
    }

    await comment.remove();

    // Remove comment from the blog post
    await BlogPost.findByIdAndUpdate(comment.blogPost, {
      $pull: { comments: comment._id },
    });

    res.json({ message: "Comment removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const index = comment.likes.findIndex(
      (like) => like.toString() === req.user._id.toString()
    );

    if (index === -1) {
      comment.likes.push(req.user._id);
    } else {
      comment.likes.splice(index, 1);
    }

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
