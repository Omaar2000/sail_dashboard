import { toast } from "react-toastify";
import { api } from "./api";
import i18n from "../i18n";

export const getAllCodes = async (token, logout) => {
  try {
    const res = await api.get(
      "https://sailgloble.com/admin/app_settings/country_code",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token here
        },
      }
    );

    console.log(res);

    return res.data.data;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};

export const addCode = async (countryCode, token) => {
  try {
    const res = await api.post(
      `https://sailgloble.com/admin/app_settings/country_code`,
      countryCode,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(i18n.t("Country code added successfully!"));
    console.log(res);
    return res.data;
  } catch (error) {
    toast.error(`Error adding country code`);
    console.error("Error adding country code:", error);
  }
};

export const editCode = async (id, countryCode, token) => {
  try {
    const res = await api.patch(
      `https://sailgloble.com/admin/app_settings/country_code/${id}`,
      countryCode,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    toast.success(i18n.t("Country code added successfully!"));
    return res.data;
  } catch (error) {
    toast.error(`Error editing country code`);
    console.error("Error editing code:", error);
  }
};
