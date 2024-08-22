import Favorite from "../models/favorite.js";

// Add a favorite
export const addFavorite = async (req, res) => {
  try {
    const { memorialId } = req.params;
    const { user_id } = req.body;

    // Check if the memorial is already favorited by the user
    const existingFavorite = await Favorite.findOne({
      user_id: user_id,
      memorial_id: memorialId,
    });
    if (existingFavorite) {
      return res
        .status(400)
        .json({ message: "You have already favorited this memorial." });
    }

    // Create a new favorite entry
    const favorite = new Favorite({
      user_id: user_id,
      memorial_id: memorialId,
    });

    await favorite.save();
    res.status(201).json({ message: "Memorial favorited successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Remove a favorite
export const removeFavorite = async (req, res) => {
  try {
    const { memorialId } = req.params;

    const { user_id } = req.body;

    // Remove the favorite entry
    await Favorite.findOneAndDelete({
      user_id: user_id,
      memorial_id: memorialId,
    });
    res.status(200).json({ message: "Memorial unfavorited successfully." });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Get user's favorites with pagination

export const getFavoritesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Calculate the total number of favorites for the user
    const totalFavorites = await Favorite.countDocuments({ user_id: userId });
    // Fetch the favorites with pagination
    const favorites = await Favorite.find({ user_id: userId })
      .populate("memorial_id")
      .populate("user_id")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      totalFavorites,
      currentPage: Number(page),
      totalPages: Math.ceil(totalFavorites / limit),
      favorites,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};
