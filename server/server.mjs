import express from "express";
import { project } from "../src/data.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/places", (req, res) => {
  const { query = "", category = "All records" } = req.query;

  let records = project.records;

  // Filter by search query.
  if (query.trim()) {
    const searchTerm = query.toLowerCase();

    records = records.filter((record) =>
      [record.title, record.description, record.category].some((value) =>
        value.toLowerCase().includes(searchTerm),
      ),
    );
  }

  // Filter by category.
  if (category !== "All records") {
    records = records.filter(
      (record) => record.category.toLowerCase() === category.toLowerCase(),
    );
  }

  res.json({ records });
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
