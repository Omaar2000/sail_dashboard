import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Replace with your backend API URL

// Function to handle login API call

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data; // Assuming response data contains the token
  } catch (error) {
    console.error("Login API call failed:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
// Function to handle register API call
// export const register = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, {
//       username,
//       password,
//     });
//     return response.data; // Assuming response data contains the user information
//   } catch (error) {
//     throw error.response.data; // Throw error for handling in components
//   }
// };
