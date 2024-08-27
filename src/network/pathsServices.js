import { toast } from "react-toastify";
import { api } from "./api";
import i18n from "../i18n";

export const getAllPaths = async (token, logout) => {
  try {
    const res = await api.get("https://dev.sailgloble.com/admin/trip_path", {
      headers: {
        "x-custom-lang": "ar",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};

export const editPath = async (id, path, token) => {
  try {
    const res = await api.patch(
      `https://dev.sailgloble.com/admin/trip_path/${id}`,
      path,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);

    toast.success(i18n.t("Path edited successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error updating path`);
    console.error("Error updating path:", error);
  }
};

export const addPath = async (path, token) => {
  try {
    const res = await api.post(
      `https://dev.sailgloble.com/admin/trip_path`,
      path,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    toast.success(i18n.t("Path added successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error adding path`);
    console.error("Error adding path:", error);
  }
};

export const deletePath = async (token, logout, id) => {
  try {
    const res = await api.delete(
      `https://dev.sailgloble.com/admin/trip_path/delete/${id}`,
      {
        headers: {
          "x-custom-lang": "ar",
          Authorization: `Bearer ${token}`, // Add the token here
        },
      }
    );

    toast.success(i18n.t("Path deleted successfully!"));
    console.log(res);

    return res.data.data;
  } catch (error) {
    toast.error(`Error deleting path`);
    console.log(error.response.status);
    if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};
