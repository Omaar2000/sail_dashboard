import { toast } from "react-toastify";
import { api } from "./api";
import i18n from "../i18n";

export const getAllCountries = async (token, logout) => {
  try {
    const res = await api.get("api/admin/app_settings/countries", {
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

export const addCountry = async (country, token) => {
  try {
    const res = await api.post(
      `https://dev.sailgloble.com/admin/app_settings/countries`,
      country,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    toast.success(i18n.t("Country Added Successfully!"));
    return res.data;
  } catch (error) {
    toast.error(`Error Adding Country`);
    console.error("Error adding country:", error);
  }
};

export const editCountry = async (id, country, token) => {
  try {
    const res = await api.patch(
      `https://dev.sailgloble.com/admin/app_settings/countries/${id}`,
      country,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(i18n.t("Country Updated successfully!"));
    return res.data;
  } catch (error) {
    toast.error(`Error updating country`);
    console.error("Error updating country:", error);
  }
};
