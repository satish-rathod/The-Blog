// controllers/userProfileController.js
import User from "../models/User.js";
import BlogPost from "../models/BlogPost.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;
    user.website = req.body.website || user.website;
    user.socialLinks = req.body.socialLinks || user.socialLinks;
    user.interests = req.body.interests || user.interests;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      bio: updatedUser.bio,
      location: updatedUser.location,
      website: updatedUser.website,
      socialLinks: updatedUser.socialLinks,
      interests: updatedUser.interests,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserBlogPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 },
      populate: "category",
    };

    const result = await BlogPost.paginate({ author: userId }, options);

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
