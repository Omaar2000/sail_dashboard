import { api } from "./api";

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
