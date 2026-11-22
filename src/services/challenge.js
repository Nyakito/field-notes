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
  const url = `${apiBase}/api/places/${encodeURIComponent(recordId)}/actions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const result = await response.json();

  if (!result || typeof result.message !== "string") {
    throw new Error("Invalid API response: a message is required.");
  }

  return result;
}
