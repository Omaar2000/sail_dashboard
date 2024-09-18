import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { boatRequestsColumns } from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import usePaginationStore from "../stores/usePaginationStore";
import { getAll } from "../network/network";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const BoatsRequests = () => {
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
          `https://sailgloble.com/admin/provider-requests/boat?limit=${pageSize}&page=${page}`
        );
        setRows(data.data);
        setTotalPages(data.pageCount);

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
        to={"/admin"}
        rows={rows}
        columns={boatRequestsColumns}
        loading={loading}
        Endpoint={`https://sailgloble.com/admin/provider-requests/approve/boat/`}
      />
    </>
  );
};

export default BoatsRequests;
