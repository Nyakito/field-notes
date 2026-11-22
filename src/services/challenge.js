const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";

export function filterRecords({ records, query, category }) {
  const searchQuery = query.trim().toLowerCase();

  return records.filter((record) => {
    const matchesQuery =
      record.title.toLowerCase().includes(searchQuery) ||
      record.description.toLowerCase().includes(searchQuery) ||
      record.category.toLowerCase().includes(searchQuery);

    const matchesCategory =
      category === "All records" || record.category === category;

    return matchesQuery && matchesCategory;
  });
}

export async function loadRecords({
  query = "",
  category = "All records",
  signal,
} = {}) {
  const params = new URLSearchParams({
    query,
    category,
  });

  const response = await fetch(`/api/places?${params}`, {
    method: "GET",
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const data = await response.json();

  if (!data || !Array.isArray(data.records)) {
    throw new Error("Invalid API response: records must be an array.");
  }

  return data.records;
}

export async function performRecordAction({ recordId, action, payload = {} }) {
  // POST /api/places/:recordId/actions with { action, ...payload } as JSON.
  // Check response.ok, validate the result, and return it for the UI to display.
  // Authorize actions in the backend and make data-changing retries safe where appropriate.
  void apiBase;
  void recordId;
  void action;
  void payload;
  throw new Error("TODO: implement performRecordAction for Field Notes.");
}
