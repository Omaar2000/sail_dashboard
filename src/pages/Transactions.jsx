import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { transactionsColumns, transactionsData } from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import usePaginationStore from "../stores/usePaginationStore";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Transactions = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { pageSize, page, setTotalPages } = usePaginationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCovers(token, logout, page, pageSize);
        setRows(data.data);
        setTotalPages(data.page_count);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching covers:", error);
      }
    };

    fetchData();
  }, [pageSize, page]);

  return (
    <>
      <TableComponent
        to=""
        rows={transactionsData}
        columns={transactionsColumns}
        loading={loading}
      />
    </>
  );
};

export default Transactions;
