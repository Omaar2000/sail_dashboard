import { toast } from "react-toastify";
import { api } from "./api";
import i18n from "../i18n";

export const getAllCovers = async (token, logout) => {
  try {
    const res = await api.get("api/admin/sliders", {
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

export const addSlider = async (slider, token) => {
  try {
    const res = await api.post(`api/admin/sliders`, slider, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    toast.success(i18n.t("Cover Added Successfully!"));
    return res.data;
  } catch (error) {
    toast.error(t(`Error adding cover`));
    console.error("Error adding category:", error);
  }
};

export const updateCover = async (id, cover, token) => {
  try {
    const res = await api.patch(`api/admin/sliders/${id}`, cover, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);

    toast.success(i18n.t("Cover Added successfully!"));
    return res.data;
  } catch (error) {
    toast.error(`Error Editing Cover`);
    console.error("Error updating cover:", error);
  }
};
