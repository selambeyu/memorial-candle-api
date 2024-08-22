import Memorial from "../models/memorial.js";
import mongoose from "mongoose";

// Create a new memorial
export const createMemorial = async (req, res, next) => {
  try {
    const { person_name, birth_date, deceased_date, description, user_id } =
      req.body;

    if (!person_name || !birth_date || !deceased_date) {
      const error = new Error("Required fields are missing");
      error.statusCode = 400;
      return next(error);
    }

    const memorial = new Memorial({
      person_name,
      birth_date,
      deceased_date,
      description,
      user_id: new mongoose.Types.ObjectId(user_id), // Convert user_id to ObjectId
      image_url: req.body.memorialImage, // URL of the uploaded photo
    });
    await memorial.save();

    res.status(201).json({
      status: "success",
      data: {
        memorial,
      },
    });
  } catch (error) {
    // If an error occurs, pass it to the global error handling middleware
    next(error);
  }
};

// Get all memorials
export const getAllMemorials = async (req, res) => {
  try {
    // Get pagination parameters from the request query string
    const { page = 1, limit = 10 } = req.query;

    // Calculate the number of documents to skip for pagination
    const skip = (page - 1) * limit;

    // Fetch memorials with pagination and populate user details
    const memorials = await Memorial.find()
      .populate("user_id", "displayName photoURL")
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of memorials
    const totalMemorials = await Memorial.countDocuments();

    // Respond with the data
    res.status(200).json({
      totalPages: Math.ceil(totalMemorials / limit),
      currentPage: parseInt(page),
      totalMemorials,
      memorials,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const searchMemorials = async (req, res) => {
  try {
    // Get the search query from the request query string

    const { search = "" } = req.query;

    // Create a filter for the search functionality
    const searchFilter = search
      ? {
          $or: [
            { person_name: { $regex: search, $options: "i" } }, // Case-insensitive search by title
            { description: { $regex: search, $options: "i" } }, // Case-insensitive search by description
          ],
        }
      : {};

    // Fetch memorials that match the search filter and populate user details
    const memorials = await Memorial.find(searchFilter).populate(
      "user_id",
      "displayName photoURL"
    );

    res.status(200).json({
      totalMemorials: memorials.length,
      memorials,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single memorial
export const getMemorialById = async (req, res) => {
  try {
    const memorial = await Memorial.findById(req.params.id).populate(
      "user_id",
      "displayName photoURL"
    );
    if (!memorial) {
      return res.status(404).json({ message: "Memorial not found" });
    }
    res.status(200).json(memorial);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a memorial
export const updateMemorial = async (req, res) => {
  try {
    const { person_name, birth_date, deceased_date, description, image_url } =
      req.body;
    let memorial = await Memorial.findById(req.params.id);
    if (!memorial) {
      return res.status(404).json({ message: "Memorial not found" });
    }
    // Check user
    if (memorial.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    memorial = await Memorial.findByIdAndUpdate(
      req.params.id,
      {
        person_name,
        birth_date,
        deceased_date,
        description,
        image_url,
        user_image_url,
      },
      { new: true }
    );
    res.status(200).json(memorial);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a memorial
export const deleteMemorial = async (req, res) => {
  try {
    const memorial = await Memorial.findById(req.params.id);
    if (!memorial) {
      return res.status(404).json({ message: "Memorial not found" });
    }
    // Check user
    if (memorial.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }
    await memorial.remove();
    res.status(200).json({ message: "Memorial removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
