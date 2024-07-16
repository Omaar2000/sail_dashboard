import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { getAllCategories } from "../../network/categoriesServices";
import { categoriesColumns, countriesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import { getAllCountries } from "../../network/countriesServices";

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

const Countries = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries(token, logout);
        setRows(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TableComponent
        to="/addcountry"
        rows={rows}
        columns={countriesColumns}
        loading={loading}
      />
    </>
  );
};

export default Countries;
