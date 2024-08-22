import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/db.js"; // Add `.js` extension
import indexRouter from "./routes/index.js"; // Add `.js` extension

// Load config
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1/", indexRouter);

app.get("/", (req, res) => {
  res.send("Yay...Memorial Candle Api is working. ");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
