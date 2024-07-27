import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import { supervisorsColumns, supervisorsData } from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import { reviewsColumns } from "../data/mockData";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Supervisors = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <TableComponent
        to=""
        rows={supervisorsData}
        columns={supervisorsColumns}
        loading={loading}
      />
    </>
  );
};

export default Supervisors;
