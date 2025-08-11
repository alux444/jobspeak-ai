import express from "express";
import multer from "multer";
import FormData from "form-data";
import fetch from "node-fetch";

export const emotionAnalysisRouter = express.Router();

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

emotionAnalysisRouter.post("/", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No video file provided");
      return;
    }

    // Create form data to send to the emotion analysis service
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // Call the emotion analysis service
    const response = await fetch("http://emotion-analysis:8004/analyze-emotion/", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).send(`Emotion analysis failed: ${errorText}`);
      return;
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in emotion analysis:", error);
    res.status(500).send("Failed to analyze emotions in video.");
  }
});
