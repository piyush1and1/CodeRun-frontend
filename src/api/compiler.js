import api from '../utils/axios.config';

/**
 * Submits code to the backend for execution.
 * @param {string} language - The language (e.g., 'cpp', 'python').
 * @param {string} code - The source code.
 * @param {string} input - The standard input.
 */
export const compileCode = async (language, code, input) => {
  const { data } = await api.post('/compiler/compile', {
    language,
    code,
    input,
  });
  return data; // This will be the formatted result
};