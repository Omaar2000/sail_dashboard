import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import {
  boatRequestsColumns,
  coversColumns,
  payoutsColumns,
  payoutsData,
  payoutsRequestsColumns,
  providerRequestsColumns,
  providerRequestsData,
} from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import usePaginationStore from "../stores/usePaginationStore";
import { getAll } from "../network/network";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const PayoutsRequests = () => {
  const [rows, setRows] = useState([]);
  const [shallowData, setShallowData] = useState([]);
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
          `https://sailgloble.com/admin/provider-requests/payout?limit=${pageSize}&page=${page}`
        );
        setShallowData(data.data);

        // setRows(data.data);
        setTotalPages(data.pageCount);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting Providers:", error);
      }
    };
    const fetchRealData = async () => {
      shallowData.map(async (provider) => {
        try {
          const res = await getAll(
            token,
            logout,
            `https://sailgloble.com/admin/provider-requests/boat/${provider.requestTypeId}`
          );
          setRows([...rows, res]);
          console.log(rows);
          console.log("asdfasfasfsfsfsaf", res);
        } catch (error) {
          console.log(error);
        }
      });
    };

    fetchData();
    fetchRealData();
    console.log(rows);
  }, [pageSize, page]);

  return (
    <>
      <TableComponent
        to={"/admin"}
        rows={rows}
        columns={payoutsRequestsColumns}
        loading={loading}
        Endpoint={`https://sailgloble.com/admin/provider-requests/approve/payout/`}
      />
    </>
  );
};

export default PayoutsRequests;
