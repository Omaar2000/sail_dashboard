import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import {
  coversColumns,
  transactionsColumns,
  transactionsData,
} from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import { reviewsColumns } from "../data/mockData";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Transactions = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCovers(token, logout);
        setRows(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching covers:", error);
      }
    };

    fetchData();
  }, []);

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
