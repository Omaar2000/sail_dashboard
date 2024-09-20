import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { getAll } from "../../network/network";
import { categoriesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import usePaginationStore from "../../stores/usePaginationStore";
import { ToastContainer } from "react-toastify";

const Categories = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { pageSize, page, setTotalPages, keyword, setPage, setPageSize } =
    usePaginationStore();

  useEffect(() => {
    setPage(1);
    setPageSize(10);
  }, []);
  console.log("pageSize", pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAll(
          token,
          logout,
          `https://sailgloble.com/admin/categories?limit=${pageSize}&page=${page}`
        );
        setRows(data.data);
        setTotalPages(data.page_count);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [pageSize, page]);

  return (
    <>
      <TableComponent
        to="/addcategory"
        // Endpoint={`https://sailgloble.com/admin/categpries/delete/`}
        rows={rows}
        columns={categoriesColumns}
        loading={loading}
        add={"ADD NEW CATEGORY"}
      />

      {/* <ToastContainer autoClose="3000" position="top-center" /> */}
    </>
  );
};

export default Categories;
