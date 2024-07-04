import { create } from "zustand";
import { login as loginAPI } from "../network/api";
// import { decodeToken } from "./jwtUtils";
import { jwtDecode } from "jwt-decode";

const useUserStore = create((set) => ({
  token: localStorage.getItem("token"), // Initialize token from localStorage
  user: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null, // Initialize user from token
  login: async (username, password) => {
    try {
      const { token } = await loginAPI(username, password); // Call API service for login
      localStorage.setItem("token", token); // Save token to localStorage
      const decodedUser = jwtDecode(token);
      set({ token, user: decodedUser }); // Update the state with the token and user info
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
  logout: () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    set({ token: null, user: null }); // Update the state to null
  },
}));

export default useUserStore;
