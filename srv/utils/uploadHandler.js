import multer from "multer";

import path from "path";

import fs from "fs";

import log from "./logger.js";

/*
  Configure multer storage for uploaded PDFs.
*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";

    // Ensure uploads folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });

      log.info("UPLOAD", "Created uploads directory");
    }

    log.info("UPLOAD", "Saving uploaded PDF to uploads folder");

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    /*
      Generate unique filenames to prevent collisions
      between uploaded documents.
    */

    const uniqueName = `${Date.now()}-${file.originalname}`;

    cb(null, uniqueName);
  },
});

/*
  Allow only PDF uploads.
*/

function fileFilter(req, file, cb) {
  const extension = path.extname(file.originalname);

  if (extension !== ".pdf") {
    log.warn("UPLOAD", `Rejected non-PDF upload: ${file.originalname}`);

    return cb(new Error("Only PDF files are allowed"));
  }

  cb(null, true);
}

export const upload = multer({
  storage,

  fileFilter,
});
