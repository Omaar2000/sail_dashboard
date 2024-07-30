// import axios from "axios";
import { toast } from "react-toastify";
import i18n from "../i18n";
import { api } from "./api";

export const getAllCategories = async (token, logout, pageNo) => {
  try {
    const res = await api.get(`api/admin/categories?limit=10`, {
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

export const updateCategory = async (id, category, token) => {
  try {
    const res = await api.patch(`api/admin/categories/${id}`, category, {
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

export const addCategory = async (category, token) => {
  try {
    const res = await api.post(`api/admin/categories`, category, {
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

export const deleteCategory = async (id, token) => {
  try {
    const res = await api.delete(`api/admin/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (error) {}
};
