import express from "express";
import {
  addFavorite,
  removeFavorite,
  getFavoritesByUserId,
} from "../../controllers/favorite-controller.js";

const favoriteRouter = express.Router();

// Route to add a favorite
favoriteRouter.post("/:memorialId", addFavorite);

// Route to remove a favorite
favoriteRouter.delete("/:memorialId", removeFavorite);

// Route to get all favorites for a user with pagination
favoriteRouter.get("/:userId", getFavoritesByUserId);

export default favoriteRouter;
