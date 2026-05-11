import cds from "@sap/cds";

import express from "express";

import { upload } from "./upload-handler.js";

import { processPdfUpload } from "../ai/rag/processPdfUpload.js";

cds.on("bootstrap", (app) => {
  app.post(
    "/upload",

    upload.single("pdf"),

    async (req, res) => {
      try {
        await processPdfUpload(req.file.path);

        res.json({
          message: "PDF uploaded and processed successfully",
        });
      } catch (error) {
        console.error(error);

        res.status(500).json({
          error: "Failed to process PDF",
        });
      }
    },
  );
});

export default cds.server;
