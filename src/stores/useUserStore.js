import { create } from "zustand";
import { login as loginAPI } from "../network/api";
// import { decodeToken } from "./jwtUtils";
import { jwtDecode } from "jwt-decode";
import i18n from "../i18n";
import { toast } from "react-toastify";

const useUserStore = create((set, get) => ({
  token: localStorage.getItem("token"), // Initialize token from localStorage
  user: localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null, // Initialize user from token

  language: localStorage.getItem("language")
    ? localStorage.getItem("language")
    : "en",
  pinned: true,
  login: async (username, password) => {
    try {
      const data = await loginAPI(username, password); // Call API service for login
      console.log(data);
      localStorage.setItem("token", data.token); // Save token to localStorage
      const decodedUser = jwtDecode(data.token);
      console.log(decodedUser);
      toast.success(i18n.t("Logged in successfully"));
      set({ token: data.token }); // Update the state with the token and user info
    } catch (error) {
      toast.error(i18n.t("Failed to login"));
      console.error("Login failed:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  },
  logout: () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    set({ token: null, user: null }); // Update the state to null
  },
  toggleLanguage: () => {
    get().language == "en" ? set({ language: "ar" }) : set({ language: "en" });
    console.log(get().language);
    localStorage.setItem("language", get().language);
    window.location.reload();
    i18n.changeLanguage(get().language);
  },

  toggleSidebar: () => {
    localStorage.setItem("pinned", get().pinned);
    get().pinned === true ? set({ pinned: false }) : set({ pinned: true });
  },
}));
export default useUserStore;
