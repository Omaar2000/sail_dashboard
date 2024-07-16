import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { getAllCategories } from "../../network/categoriesServices";
import {
  categoriesColumns,
  citiesColumns,
  countriesColumns,
} from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import { getAllCountries } from "../../network/countriesServices";
import { getAllCities } from "../../network/citiesServices";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

export const addCategory = async (category) => {
  const res = await axios.post("/api/categories", category);
  return res.data;
};

export const updateCategory = async (id, category) => {
  const res = await axios.patch(`/api/categories/${id}`, category);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await axios.delete(`/api/categories/${id}`);
  return res.data;
};

const Cities = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCities(token, logout);
        setRows(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TableComponent
        to="/addcity"
        rows={rows}
        columns={citiesColumns}
        loading={loading}
      />
    </>
  );
};

export default Cities;
