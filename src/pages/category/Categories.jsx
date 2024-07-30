import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { getAllCategories } from "../../network/categoriesServices";
import { categoriesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

// export const addCategory = async (category) => {
//   const res = await axios.post("/api/categories", category);
//   return res.data;
// };

// export const updateCategory = async (id, category) => {
//   const res = await axios.patch(`/api/categories/${id}`, category);
//   return res.data;
// };

// export const deleteCategory = async (id) => {
//   const res = await axios.delete(`/api/categories/${id}`);
//   return res.data;
// };

const Categories = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories(token, logout, pageNo);
        setRows(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TableComponent
        to="/addcategory"
        rows={rows}
        columns={categoriesColumns}
        loading={loading}
        pageNo={pageNo}
        setPageNo={setPageNo}
      />
    </>
  );
};

export default Categories;
