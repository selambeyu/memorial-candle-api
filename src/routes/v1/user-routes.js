import express from "express";
import {
  editUserProfile,
  registerUser,
  loginUser,
} from "../../controllers/user-controller.js";

const userRouter = express.Router();
// @desc Register user
// @route POST /api/users/register
userRouter.post("/register", registerUser);

// @desc Login user
// @route POST /api/users/login
userRouter.post("/login", loginUser);

// @desc Edit user profile
// @route PUT /api/users/:id
userRouter.put("/:id", editUserProfile);

export default userRouter;
