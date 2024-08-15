import express from "express";
import {
  createDonation,
  getAllDonations,
  getDonationById,
  getDonationsByMemorialId,
  updateDonation,
  deleteDonation,
} from "../../controllers/donation-controller.js";

const donationRouter = express.Router();

// Route to get all donations with pagination
donationRouter.get("/", getAllDonations);
donationRouter.post("/", createDonation);
donationRouter.get("/memorials/:memorial_id", getDonationsByMemorialId);
donationRouter.get("/:id", getDonationById);
donationRouter.put("/:id", updateDonation);
donationRouter.delete("/:id", deleteDonation);

export default donationRouter;
