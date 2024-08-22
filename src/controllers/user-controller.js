import bcrypt from "bcryptjs";
import User from "../models/user.js"; // Add `.js` extension

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

// Get all users with pagination
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Calculate total number of users
    const totalUsers = await User.countDocuments();

    // Fetch users with pagination
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      totalUsers,
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
};

export const registerUser = async (req, res) => {
  const { uid, displayName, email, password, photoURL } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      uid,
      displayName,
      email,
      photoURL,
    });

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const editUserProfile = async (req, res) => {
  const { displayName, email, photoURL, password } = req.body;
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.displayName = displayName || user.displayName;
    user.email = email || user.email;
    user.photoURL = photoURL || user.photoURL;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
export const updateProfileImage = async (req, res) => {};
