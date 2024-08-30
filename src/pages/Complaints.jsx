import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { complaintsColumns } from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import usePaginationStore from "../stores/usePaginationStore";
import { getAll } from "../network/network";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const ComplaintsComponent = () => {
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
          `https://dev.sailgloble.com/admin/provider-requests/complaints?limit=${pageSize}&page=${page}`
        );
        setRows(data.data);
        setTotalPages(data.pageCount);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting Complaints:", error);
      }
    };

    fetchData();
  }, [pageSize, page]);

  return (
    <>
      <TableComponent
        to={"/admin"}
        rows={rows}
        columns={complaintsColumns}
        loading={loading}
        // Endpoint={`https://dev.sailgloble.com/admin/provider-requests/approve/boat/`}
      />
    </>
  );
};

export default ComplaintsComponent;
