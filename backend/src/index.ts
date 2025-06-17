import express from "express";
import { callKeywordGeneration } from "./routes/keyword-generation";

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  res.send("Hello, Worlds!");
  callKeywordGeneration().catch((err) => {
    console.error("The sample encountered an error:", err);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
