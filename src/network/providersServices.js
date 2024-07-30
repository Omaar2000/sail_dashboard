// import axios from "axios";
import { api } from "./api";

export const getAllProviders = async (token, logout) => {
  try {
    const res = await api.get("api/admin/clients/providers", {
      headers: {
        "x-custom-lang": "ar",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    console.log(res);

    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};

export const deleteOneProvider = async (token, logout, id) => {
  try {
    const res = await api.delete(`api/admin/providers/delete/${id}`, {
      headers: {
        "x-custom-lang": "ar",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    console.log(res);

    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};
export const banProvider = async (token, id) => {
  try {
    const res = await api.post(`api/admin/providers/ban/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

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
export const unbanProvider = async (token, logout, id) => {
  try {
    const res = await api.post(`api/admin/providers/unban/${id}`, {
      headers: {
        "x-custom-lang": "ar",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    console.log(res);
    toast.success(i18n.t("User unbanned successfully!"));
    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    toast.error(i18n.t("Error unbanning user!"));
    // if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};
export const verifyProvider = async (token, logout, id) => {
  try {
    const res = await api.post(`api/admin/providers/verify/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    console.log(res);
    toast.success(i18n.t("User verified successfully!"));
    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    toast.error(i18n.t("Error verifying user!"));
    // if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};
