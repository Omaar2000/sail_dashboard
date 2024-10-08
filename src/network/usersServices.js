// import axios from "axios";
import { toast } from "react-toastify";
import { api } from "./api";
import i18n from "../i18n";
import axios from "axios";

export const getAllUsers = async (token, logout, page = 1, pageSize = 10) => {
  try {
    const res = await api.get(
      `https://sailgloble.com/admin/clients/users?limit=${pageSize}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};

export const deleteUser = async (token, logout, id) => {
  try {
    const res = await api.delete(
      `https://sailgloble.com/admin/clients/delete/${id}`,
      {
        headers: {
          "x-custom-lang": "ar",
          Authorization: `Bearer ${token}`, // Add the token here
        },
      }
    );

    console.log(res);
    toast.success(i18n.t("User deleted successfully!"));
    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    toast.error(i18n.t("Error deleting user!"));
    if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};
export const banUser = async (token, logout, id) => {
  try {
    const res = await api.post(
      `https://sailgloble.com/admin/clients/ban/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      }
    );

    console.log(res);
    toast.success(i18n.t("User banned successfully!"));
    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    console.log(error);

    toast.error(i18n.t("Error banning user!"));
    // if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};
export const unbanUser = async (token, logout, id) => {
  try {
    const res = await api.post(
      `https://sailgloble.com/admin/clients/unban/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      }
    );

    console.log(res);
    toast.success(i18n.t("User banned successfully!"));
    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    toast.error(i18n.t("Error banning user!"));
    // if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};
