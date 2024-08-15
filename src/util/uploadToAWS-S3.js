import fs from "fs";
import stream from "stream";
import { catchAsync } from "./catchAsync.js";
import { S3 } from "@aws-sdk/client-s3";
import awsLibStorage from "@aws-sdk/lib-storage";

// Initialize the S3 client
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Middleware for uploading files to S3
export const uploadFileToS3 = (fileField, upload_path) =>
  catchAsync(async (req, res, next) => {
    const file = req.file;
    console.log("hi file", file);
    if (!file) return next();

    const upload_path_key = upload_path || process.env.AWS_S3_ROOT_UPLOAD_PATH;
    const bucketName = process.env.AWS_S3_MEMORIALCANDLE_BUCKET_PUBLIC;
    const filename = file.originalname;
    const filekey = `${upload_path_key}/${filename}`;

    try {
      const result = await uploadToS3(bucketName, filekey, file.mimetype, file);
      req.body[fileField] = result.Location;
      return next();
    } catch (err) {
      console.error("File upload middleware:", err);
      return next(new CustomError("File Upload Error", err));
    }
  });

// Function to get a readable stream from a file
const getFileStream = (file) => {
  if (file.buffer) return stream.Readable.from(file.buffer);
  return fs.createReadStream(file.path);
};

// Function to upload a file to S3
const uploadToS3 = async (bucketName, fileKey, fileMimeType, file) => {
  if (!bucketName || !fileKey || !fileMimeType || !file) {
    throw new Error("Invalid input: Missing required parameters");
  }

  try {
    const fileStream = getFileStream(file);

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      ContentType: fileMimeType,
      Body: fileStream,
    };

    const upload = new awsLibStorage.Upload({
      client: s3,
      params,
      partSize: 5 * 1024 * 1024, // 5 MB parts
      queueSize: 4, // Concurrent upload threads
    });

    const data = await upload.done();
    return data;
  } catch (err) {
    console.error("Error uploading file to S3:", err);
    throw err;
  } finally {
    // Clean up the local file if it's stored by multer
    if (file.path && fs.existsSync(file.path)) {
      fs.unlink(file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
  }
};
