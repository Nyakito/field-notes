const apiBase = import.meta.env.VITE_API_BASE_URL ?? '';

export function filterRecords({ records, query, category }) {
  // Match query case-insensitively against title, description, and category; trim whitespace first.
  // Apply category unless it is "All records". Return a new array without mutating records.
  // Keep matching deterministic and test empty queries, whitespace, and no-result cases.
  throw new Error('TODO: implement filterRecords for Field Notes.');
}

export async function loadRecords({ query = '', category = 'All records', signal } = {}) {
  // Fetch GET /api/places with query and category URL parameters; pass signal through to fetch.
  // Check response.ok, parse JSON, and validate it contains {records:[...]} before returning.
  // Surface HTTP and malformed-response errors; never silently replace failures with starter records.
  void apiBase; void query; void category; void signal;
  throw new Error('TODO: implement loadRecords for Field Notes.');
}

export async function performRecordAction({ recordId, action, payload = {} }) {
  // POST /api/places/:recordId/actions with { action, ...payload } as JSON.
  // Check response.ok, validate the result, and return it for the UI to display.
  // Authorize actions in the backend and make data-changing retries safe where appropriate.
  void apiBase; void recordId; void action; void payload;
  throw new Error('TODO: implement performRecordAction for Field Notes.');
}
