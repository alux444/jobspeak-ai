import express from "express";
import cors from "cors";
import { responseContentRouter } from "./routes/response-content";
import { responseSentimentRouter } from "./routes/response-sentiment";
import { keywordAnalysisRouter } from "./routes/keyword-analysis";

const app = express();
const port = 3000;

// Enable CORS for frontend requests
app.use(cors());
app.use(express.json());

app.use("/response-content", responseContentRouter);
app.use("/response-sentiment", responseSentimentRouter);
app.use("/keyword-analysis", keywordAnalysisRouter);

app.get("/", (_req, res) => {
  res.send("Hello, Worlds!");
});

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
