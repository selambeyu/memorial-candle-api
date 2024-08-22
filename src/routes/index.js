import express from "express";
import userRouter from "./v1/user-routes.js";
import memorialRouter from "./v1/memorial-routes.js";
import donationRouter from "./v1/donation-routes.js";
import favoriteRouter from "./v1/favorite-routes.js";

const indexRouter = express.Router();

indexRouter.use("/users", userRouter);

indexRouter.use("/memorials", memorialRouter);

indexRouter.use("/donations", donationRouter);

indexRouter.use("/favorites", favoriteRouter);

indexRouter.get("/", (req, res) => {
  res.send("Hooray...Memorial Candle Api is working. ");
});
export default indexRouter;
