import multer from "multer";

import path from "path";

import fs from "fs";

import log from "./logger.js";

/*
  Determine upload directory based on environment.

  Cloud Foundry:
  -> use /tmp/uploads

  Local development:
  -> use uploads/
*/

const uploadDirectory =
  process.env.NODE_ENV === "production" ? "/tmp/uploads" : "uploads";

/*
  Ensure upload directory exists.
*/

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    log.info("UPLOAD", `Saving uploaded PDF to ${uploadDirectory}`);

    cb(null, uploadDirectory);
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
