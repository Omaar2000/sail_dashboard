import { useNavigate } from "react-router-dom";
import { api } from "./api";
import { toast } from "react-toastify";
import i18n from "../i18n";

export const getAllCities = async (token, logout) => {
  try {
    const res = await api.get("api/admin/app_settings/cities", {
      headers: {
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

export const addCity = async (city, token) => {
  try {
    const res = await api.post(`api/admin/app_settings/cities`, city, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    toast.success(i18n.t("City added successfully!"));
    return res.data;
  } catch (error) {
    toast.error(`Error adding city`);
    console.error("Error adding city:", error);
  }
};

export const editCity = async (id, city, token) => {
  try {
    const res = await api.patch(`api/admin/app_settings/cities/${id}`, city, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    toast.success(i18n.t("City Edited successfully!"));
    return res.data;
  } catch (error) {
    toast.error(`Error editing city`);
    console.error("Error editing city:", error);
  }
};
