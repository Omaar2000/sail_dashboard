import { useEffect, useState } from "react";
import { supervisorsColumns, supervisorsData } from "../data/mockData";
import TableComponent from "../components/Table";
import useUserStore from "../stores/useUserStore";
import usePaginationStore from "../stores/usePaginationStore";
import { getAll } from "../network/network";

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
          `https://dev.sailgloble.com/admin/admin/all?limit=${pageSize}&page=${page}`
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
        to=""
        rows={supervisorsData}
        columns={supervisorsColumns}
        // loading={loading}
      />
    </>
  );
};
export default Supervisors;
