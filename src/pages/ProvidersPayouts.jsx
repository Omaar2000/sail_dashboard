import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import { payoutsColumns, payoutsData, reviewsColumns } from "../data/mockData";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const PayoutsRequests = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <TableComponent
        to=""
        rows={payoutsData}
        columns={payoutsColumns}
        loading={loading}
      />
    </>
  );
};

export default PayoutsRequests;
