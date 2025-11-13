import api from '../utils/axios.config';

/**
 * Sends a request to the backend to get an OTP.
 * @param {string} email - The user's email address.
 */
export const requestOTP = async (email) => {
  const { data } = await api.post('/auth/request-otp', { email });
  return data;
};

/**
 * Sends the email and OTP to the backend for verification.
 * @param {string} email - The user's email.
 * @param {string} otp - The one-time password.
 */
export const verifyOTP = async (email, otp) => {
  const { data } = await api.post('/auth/verify-otp', { email, otp });
  return data; // This will include the user object and message
};

/**
 * Tells the backend to clear the user's auth cookie.
 */
export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
};