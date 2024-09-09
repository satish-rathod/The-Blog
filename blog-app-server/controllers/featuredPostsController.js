// controllers/featuredPostsController.js
import BlogPost from "../models/BlogPost.js";

export const setFeaturedPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { featured } = req.body;

    const post = await BlogPost.findByIdAndUpdate(
      id,
      { featured },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getFeaturedPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: [
        { path: "author", select: "username" },
        { path: "category", select: "name" },
      ],
    };

    const result = await BlogPost.paginate({ featured: true }, options);

    res.json({
      posts: result.docs,
      currentPage: result.page,
      totalPages: result.totalPages,
      totalPosts: result.totalDocs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
