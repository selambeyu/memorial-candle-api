import Donation from "../models/donation.js";

// Create a new donation
export const createDonation = async (req, res) => {
  try {
    const {
      memorial_id,
      user_id,

      donated_by,
      personal_word,
      amount,
      stripeSessionId,
    } = req.body;

    const newDonation = new Donation({
      memorial_id,
      user_id,

      donated_by,
      personal_word,
      amount,
      stripeSessionId,
    });

    const savedDonation = await newDonation.save();

    res.status(201).json({
      message: "Donation created successfully",
      donation: savedDonation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all donations
export const getAllDonations = async (req, res) => {
  try {
    // Retrieve pagination parameters from the query string
    const { page = 1, limit = 10 } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * pageSize;

    // Find donations with pagination
    const donations = await Donation.find()
      .skip(skip)
      .limit(pageSize)
      .populate("memorial_id", "person_name description")
      .populate("user_id", "displayName photoURL");

    // Get the total number of donations for pagination info
    const totalDonations = await Donation.countDocuments();

    res.status(200).json({
      totalDonations,
      totalPages: Math.ceil(totalDonations / pageSize),
      currentPage: pageNumber,
      donations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getDonationsByMemorialId = async (req, res) => {
  try {
    const { memorial_id } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Check if the memorial exists
    const memorial = await Memorial.findById(memorial_id);
    if (!memorial) {
      return res.status(404).json({ message: "Memorial not found" });
    }

    // Calculate the number of documents to skip
    const skip = (pageNumber - 1) * pageSize;

    // Find donations with pagination
    const donations = await Donation.find({ memorial_id })
      .skip(skip)
      .limit(pageSize)
      .populate("user_id", "displayName photoURL")
      .populate("memorial_id", "person_name description");

    // Get the total number of donations for pagination info
    const totalDonations = await Donation.countDocuments({ memorial_id });

    res.status(200).json({
      totalDonations,
      totalPages: Math.ceil(totalDonations / pageSize),
      currentPage: pageNumber,
      donations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single donation by ID
export const getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("user_id", "displayName photoURL")
      .populate("memorial_id", "person_name description");

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json(donation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a donation by ID
export const updateDonation = async (req, res) => {
  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({
      message: "Donation updated successfully",
      donation: updatedDonation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a donation by ID
export const deleteDonation = async (req, res) => {
  try {
    const deletedDonation = await Donation.findByIdAndDelete(req.params.id);

    if (!deletedDonation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
