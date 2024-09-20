import { useEffect, useState } from "react";
import { supervisorsColumns, supervisorsData } from "../data/mockData";
import TableComponent from "../components/Table";
import useUserStore from "../stores/useUserStore";
import usePaginationStore from "../stores/usePaginationStore";
import { getAll } from "../network/network";
import { ToastContainer } from "react-toastify";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Supervisors = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { pageSize, page, setTotalPages, setPage, setPageSize } =
    usePaginationStore();

  useEffect(() => {
    setPage(1);
    setPageSize(10);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAll(
          token,
          logout,
          `https://sailgloble.com/admin/admin/all?limit=${pageSize}&page=${page}`
        );
        setRows(data.data);
        setTotalPages(data.page_count);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting Providers:", error);
      }
    };
    fetchData();
  }, [pageSize, page]);
  return (
    <>
      <TableComponent
        // Endpoint={`https://sailgloble.com/admin/admins/delete/`}
        to=""
        rows={supervisorsData}
        columns={supervisorsColumns}
        // loading={loading}
      />
      <ToastContainer autoClose="3000" position="top-center" />
    </>
  );
};
export default Supervisors;
