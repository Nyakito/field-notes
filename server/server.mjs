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

const savedRecords = new Set();

app.post("/api/places/:recordId/actions", (req, res) => {
  const { recordId } = req.params;
  const { action, ...payload } = req.body;

  // CREATE A NEW PLACE
  if (action === "create") {
    const { title, description, category } = payload;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof category !== "string" ||
      !category.trim()
    ) {
      return res.status(400).json({
        message: "Title, description and category are required.",
      });
    }

    const newRecord = {
      id: `field-notes-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category: category.trim().toUpperCase(),
      meta: "Recently added",
      image: "",
      imageAlt: title.trim(),
    };

    project.records.push(newRecord);

    return res.status(201).json({
      message: "Place added successfully.",
      record: newRecord,
    });
  }

  // FIND THE EXISTING PLACE
  const record = project.records.find((item) => item.id === recordId);

  if (!record) {
    return res.status(404).json({
      message: "Place not found.",
    });
  }

  // SAVE A PLACE
  if (action === "save") {
    savedRecords.add(recordId);

    return res.json({
      message: `${record.title} saved successfully.`,
    });
  }

  // UNSAVE A PLACE
  if (action === "unsave") {
    savedRecords.delete(recordId);

    return res.json({
      message: `${record.title} removed from saved records.`,
    });
  }

  // OPEN A PLACE
  if (action === "open") {
    return res.json({
      message: `Opening ${record.title}.`,
    });
  }

  // UNKNOWN ACTION
  return res.status(400).json({
    message: "Unsupported action.",
  });
});
