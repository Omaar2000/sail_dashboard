import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { boatRequestsColumns } from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import usePaginationStore from "../stores/usePaginationStore";
import { getAll } from "../network/network";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Notifications = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { pageSize, page, setTotalPages } = usePaginationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAll(
          token,
          logout,
          `https://dev.sailgloble.com/admin/notifications?limit=${pageSize}&page=${page}`
        );
        setRows(data.data);
        setTotalPages(data.pageCount);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, [pageSize, page]);

  return (
    <>
      <TableComponent
        to="/send"
        rows={rows}
        columns={boatRequestsColumns}
        loading={loading}
        add={"Send a Notification"}
      />
    </>
  );
};

export default Notifications;
