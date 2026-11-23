import { project } from '../data.js';

const DEFAULT_CATEGORY = 'All records';

function normalizeText(value) {
  return typeof value === 'string' ? value.trim().toLocaleLowerCase() : '';
}

export function filterRecords({
  records = project.records,
  query = '',
  category = DEFAULT_CATEGORY,
} = {}) {
  if (!Array.isArray(records)) return [];

  const searchQuery = normalizeText(query);
  const selectedCategory = normalizeText(category);

  return records.filter((record) => {
    if (!record || typeof record !== 'object') return false;

    const searchableText = [record.title, record.description, record.category, record.meta]
      .filter((value) => typeof value === 'string')
      .join(' ')
      .toLocaleLowerCase();
    const matchesQuery = !searchQuery || searchableText.includes(searchQuery);
    const matchesCategory = !selectedCategory
      || selectedCategory === normalizeText(DEFAULT_CATEGORY)
      || normalizeText(record.category) === selectedCategory;

    return matchesQuery && matchesCategory;
  });
}

export async function loadRecords({ query = '', category = DEFAULT_CATEGORY, signal } = {}) {
  if (signal?.aborted) {
    const error = new Error('Loading records was cancelled.');
    error.name = 'AbortError';
    throw error;
  }

  const records = filterRecords({ records: project.records, query, category });
  return records;
}

export async function performRecordAction({ recordId, action } = {}) {
  const record = project.records.find((item) => item.id === recordId);
  if (!record && action !== 'create') {
    return { message: 'No matching starter record was found; no changes were made.' };
  }
  const title = record?.title ?? 'This record';

  if (action === 'save') {
    return { message: `${title} was added to your saved items for this session.` };
  }
  if (action === 'unsave') {
    return { message: `${title} was removed from your saved items for this session.` };
  }
  if (action === 'open') {
    return { message: `A detail view for ${title.toLowerCase()} is not available in this local demo; no data was changed.` };
  }
  if (action === 'create') {
    return { message: 'No record was created; adding records is not implemented in this local demo.' };
  }

  return {
    message: `The ${JSON.stringify(String(action ?? 'unknown'))} action is not implemented in this local demo; no data was changed.`,
  };
}
