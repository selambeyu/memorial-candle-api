import express from "express";
import multer from "multer";
import { uploadFileToS3 } from "../../util/uploadToAWS-S3.js";
import {
  createMemorial,
  updateMemorial,
  deleteMemorial,
  getAllMemorials,
  getMemorialById,
  searchMemorials,
} from "../../controllers/memorial-controller.js";
const memorialRouter = express.Router();
// Set up multer storage (use memory storage to work directly with the buffer)
const multerStorage = multer.memoryStorage();
const multerupload = multer({ storage: multerStorage });

memorialRouter.get("/", getAllMemorials);

// router.post("/", memorisalController.createMemorial);

memorialRouter.patch("/:id", updateMemorial);

memorialRouter.delete("/:id", deleteMemorial);

memorialRouter.get("/search", searchMemorials);

memorialRouter.post(
  "/",
  multerupload.single("memorialImage"),
  //handler middleware
  uploadFileToS3("memorialImage", process.env.MEMORIAL_IMAGE_UPLOAD_PATH),
  createMemorial
);
export default memorialRouter;
