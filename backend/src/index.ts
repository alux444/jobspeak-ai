import express from "express";
import cors from "cors";
import { audioAnalysisRouter } from "./routes/audio-analysis";
import { responseContentRouter } from "./routes/response-content";
import { responseSentimentRouter } from "./routes/response-sentiment";
import { keywordAnalysisRouter } from "./routes/keyword-analysis";
import { feedbackSummariserRouter } from "./routes/feedback-summariser";
import { videoAnalysisRouter } from "./routes/video-analysis";
import { jobSummaryConversionRouter } from "./routes/job-summary-conversion";

const app = express();
const port = 3000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

app.use("/audio-analysis", audioAnalysisRouter);
app.use("/response-content", responseContentRouter);
app.use("/response-sentiment", responseSentimentRouter);
app.use("/keyword-analysis", keywordAnalysisRouter);
app.use("/video-analysis", videoAnalysisRouter);
app.use("/feedback-summariser", feedbackSummariserRouter);
app.use("/job-summary-conversion", jobSummaryConversionRouter);

app.get("/", (_req, res) => {
  res.send("Hello, Worlds!");
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
