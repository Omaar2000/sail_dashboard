import { toast } from "react-toastify";
import { api } from "./api";
import i18n from "../i18n";

export const getAllPaths = async (token, logout) => {
  try {
    const res = await api.get("api/admin/trip_path", {
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
    const res = await api.patch(`api/admin/trip_path/${id}`, path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    const res = await api.post(`api/admin/trip_path`, path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    toast.success(i18n.t("Path added successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error adding path`);
    console.error("Error adding path:", error);
  }
};
