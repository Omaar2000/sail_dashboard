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
      },
    });
    console.log(res);

    toast.success(i18n.t("Row Updated successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error Updating Row`);
    console.error("Error updating row:", error);
  }
};
export const updateMultipartItem = async (token, logout, endpoint, BODY) => {
  try {
    const res = await api.patch(endpoint, BODY, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);

    toast.success(i18n.t("Row Updated successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error Updating Row`);
    console.error("Error updating row:", error);
  }
};

export const addItem = async (token, logout, endpoint, BODY) => {
  try {
    const res = await api.post(endpoint, BODY, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    toast.success(i18n.t("Row added successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error adding row`);
    console.error("Error adding row:", error);
  }
};

export const addMultipartItem = async (token, logout, endpoint, BODY) => {
  try {
    const res = await api.post(endpoint, BODY, {
      headers: {
        Authorization: `Bearer ${token}`,

        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    toast.success(i18n.t("Row added successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error adding row`);
    console.error("Error adding row:", error);
  }
};

export const assignAdmin = async (token, logout, endpoint, BODY) => {
  try {
    const res = await api.post(endpoint, BODY, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    toast.success(i18n.t("Requests assigned successfully!"));

    return res.data;
  } catch (error) {
    toast.error(`Error assigning requests`);
    // console.error("Error adding row:", error);
  }
};

export const deleteItem = async (token, logout, endpoint) => {
  try {
    const res = await api.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  } catch (error) {}
};
