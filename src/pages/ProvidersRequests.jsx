import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import {
  coversColumns,
  payoutsColumns,
  payoutsData,
  providerRequestsColumns,
  providerRequestsData,
} from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import { reviewsColumns } from "../data/mockData";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const ProvidersRequests = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <TableComponent
        to=""
        rows={providerRequestsData}
        columns={providerRequestsColumns}
        loading={loading}
      />
    </>
  );
};

export default ProvidersRequests;
