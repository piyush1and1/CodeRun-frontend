import api from '../utils/axios.config';

/**
 * Fetches the currently authenticated user's profile.
 */
export const getProfile = async () => {
  const { data } = await api.get('/user/profile');
  return data; // { success: true, user: {...} }
};

/**
 * Fetches all code snippets for the authenticated user.
 */
export const getSnippets = async (params = {}) => {
  const { data } = await api.get('/user/snippets', { params });
  return data; // { success: true, snippets: [...], pagination: {...} }
};

/**
 * Fetches a single snippet by ID (used for viewing full code in popup).
 * @param {string} snippetId - The ID of the snippet to fetch.
 */
export const getSnippetById = async (snippetId) => {
  const { data } = await api.get(`/user/snippets/${snippetId}`);
  return data.snippet; // { _id, title, language, code, createdAt }
};

/**
 * Saves a new code snippet.
 * @param {object} snippetData - { title, language, code }
 */
export const saveSnippet = async (snippetData) => {
  const { data } = await api.post('/user/snippets', snippetData);
  return data; // { success: true, snippet: {...} }
};

/**
 * Updates an existing snippet by ID.
 * @param {string} snippetId
 * @param {object} snippetData - Updated fields
 */
export const updateSnippet = async (snippetId, snippetData) => {
  const { data } = await api.put(`/user/snippets/${snippetId}`, snippetData);
  return data; // { success: true, snippet: {...} }
};

/**
 * Deletes a snippet by ID.
 * @param {string} snippetId
 */
export const deleteSnippet = async (snippetId) => {
  const { data } = await api.delete(`/user/snippets/${snippetId}`);
  return data; // { success: true, message: 'Snippet deleted successfully' }
};

/**
 * Deletes multiple snippets by IDs.
 * @param {Array<string>} snippetIds
 */
export const deleteMultipleSnippets = async (snippetIds) => {
  const { data } = await api.delete('/user/snippets', { data: { snippetIds } });
  return data; // { success: true, message: 'X snippets deleted successfully' }
};

/**
 * Searches snippets by keyword in title or code.
 * @param {string} query
 * @param {object} params - { page, limit }
 */
export const searchSnippets = async (query, params = {}) => {
  const { data } = await api.get(`/user/snippets/search/${query}`, { params });
  return data; // { success: true, snippets: [...], pagination: {...} }
};

/**
 * Exports all snippets as JSON.
 */
export const exportSnippets = async () => {
  const { data } = await api.get('/user/export');
  return data; // { user, snippets, exportDate, ... }
};

/**
 * Imports snippets from JSON.
 * @param {Array<object>} snippets
 */
export const importSnippets = async (snippets) => {
  const { data } = await api.post('/user/import', { snippets });
  return data; // { success: true, importedCount, snippets: [...] }
};
