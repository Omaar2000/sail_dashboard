// import axios from "axios";
import { toast } from "react-toastify";
import i18n from "../i18n";
import { api } from "./api";

export const getAll = async (token, logout, endpoint) => {
  try {
    const res = await api.get(endpoint, {
      headers: {
        "x-custom-lang": "ar",
        Authorization: `Bearer ${token}`, // Add the token here
      },
    });

    console.log(res);

    return res.data;
  } catch (error) {
    console.log(error.response.status);
    if (error.response.status === 401) logout();

    throw error; // Optionally re-throw the error if you want to handle it elsewhere
  }
};

export const updateItem = async (token, logout, endpoint, BODY) => {
  try {
    const res = await api.patch(endpoint, BODY, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);

    toast.success(i18n.t("Category Updated successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error Updating Category`);
    console.error("Error updating category:", error);
  }
};

export const addItem = async (token, logout, endpoint, BODY) => {
  try {
    const res = await api.post(endpoint, BODY, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    toast.success(i18n.t("Category added successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error adding Category`);
    console.error("Error adding category:", error);
  }
};

export const deleteItem = async (token, logout, endpoint, BODY) => {
  try {
    const res = await api.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (error) {}
};
