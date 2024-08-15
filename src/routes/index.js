import express from "express";
import userRouter from "./v1/user-routes.js";
import memorialRouter from "./v1/memorial-routes.js";
import donationRouter from "./v1/donation-routes.js";

const indexRouter = express.Router();

indexRouter.use("/users", userRouter);

indexRouter.use("/memorials", memorialRouter);

indexRouter.use("/donations", donationRouter);

indexRouter.get("/", (req, res) => {
  res.send("Horay...Report Api is working. ");
});
export default indexRouter;
