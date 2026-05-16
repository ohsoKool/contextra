import cds from "@sap/cds";

import { upload } from "./utils/uploadHandler.js";

import { processPdfUpload } from "./ai/ingestion/processPdfUpload.js";

import log from "./utils/logger.js";

/*
  Extend CAP server using custom Express routes.

  Current custom routes:
  - PDF upload endpoint
*/

cds.on("bootstrap", (app) => {
  // Allow custom upload requests
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader("Access-Control-Allow-Headers", "*");

    next();
  });

  app.post(
    "/upload",

    // Disable CSRF requirement for custom upload route
    (req, res, next) => {
      req.csrfToken = () => "";

      next();
    },

    upload.single("pdf"),

    async (req, res) => {
      const start = Date.now();

      try {
        if (!req.file) {
          return res.status(400).json({
            error: "No PDF file uploaded",
          });
        }

        log.info("UPLOAD", `Received file upload: ${req.file.originalname}`);

        await processPdfUpload(req.file.path);

        const duration = Date.now() - start;

        log.success("UPLOAD", `PDF processed successfully in ${duration}ms`);

        return res.json({
          success: true,

          message: "PDF uploaded and processed successfully",
        });
      } catch (error) {
        log.error("UPLOAD", "Failed to process uploaded PDF", error);

        return res.status(500).json({
          success: false,

          error: "Failed to process PDF",
        });
      }
    },
  );
});

export default cds.server;
