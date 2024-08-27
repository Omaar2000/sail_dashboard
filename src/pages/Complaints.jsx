import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import {
  complaintsColumns,
  complaintsData,
  coversColumns,
} from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import { reviewsColumns } from "../data/mockData";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Complaints = () => {
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
        rows={complaintsData}
        columns={complaintsColumns}
        loading={loading}
      />
    </>
  );
};

export default Complaints;
