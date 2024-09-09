// controllers/blogPostController.js
import BlogPost from "../models/BlogPost.js";

// Update the createBlogPost function to use category
export const createBlogPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const blogPost = new BlogPost({
      title,
      content,
      category,
      tags,
      author: req.user._id,
    });
    const savedPost = await blogPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    blogPost.views += 1;
    await blogPost.save();
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blogPost.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only update your own posts" });
    }

    blogPost.title = title || blogPost.title;
    blogPost.content = content || blogPost.content;
    blogPost.category = category || blogPost.category;
    blogPost.tags = tags || blogPost.tags;

    const updatedPost = await blogPost.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (blogPost.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own posts" });
    }

    await blogPost.remove();
    res.json({ message: "Blog post removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likeBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const index = blogPost.likes.findIndex(
      (id) => id.toString() === req.user._id.toString()
    );

    if (index === -1) {
      blogPost.likes.push(req.user._id);
    } else {
      blogPost.likes.splice(index, 1);
    }

    await blogPost.save();
    res.json(blogPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllBlogPosts = async (req, res) => {
  try {
    const { category, query, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (query) {
      filter.$text = { $search: query };
    }

    const options = {
      populate: [
        { path: "author", select: "username" },
        { path: "category", select: "name" },
      ],
      sort: query ? { score: { $meta: "textScore" } } : { createdAt: -1 },
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await BlogPost.paginate(filter, options);

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

// Update searchBlogPosts to include pagination
export const searchBlogPosts = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const options = {
      populate: [
        { path: "author", select: "username" },
        { path: "category", select: "name" },
      ],
      sort: { score: { $meta: "textScore" } },
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    const result = await BlogPost.paginate(
      { $text: { $search: query } },
      options
    );

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

export const getTrendingPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Update trending scores (this could be moved to a scheduled job in a production environment)
    await updateTrendingScores();

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { trendingScore: -1 },
      populate: [
        { path: "author", select: "username" },
        { path: "category", select: "name" },
      ],
    };

    const result = await BlogPost.paginate({}, options);

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

const updateTrendingScores = async () => {
  const posts = await BlogPost.find({}).populate("comments");
  const now = new Date();

  for (let post of posts) {
    // Calculate score based on likes, views, comments, and recency
    const likesWeight = 1;
    const viewsWeight = 0.5;
    const commentsWeight = 2;
    const recencyWeight = 10000; // Higher weight for more recent posts

    const likesScore = post.likes.length * likesWeight;
    const viewsScore = post.views * viewsWeight;
    const commentsScore = post.comments.length * commentsWeight;

    const ageInHours = (now - post.createdAt) / (1000 * 60 * 60);
    const recencyScore = recencyWeight / (ageInHours + 2); // +2 to avoid division by zero and to reduce the impact of very new posts

    post.trendingScore = likesScore + viewsScore + commentsScore + recencyScore;
    await post.save();
  }
};
