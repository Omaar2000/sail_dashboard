import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import useUserStore from "../../stores/useUserStore";
import { providerColumns } from "../../data/mockData";
import { getAll } from "../../network/network";
import usePaginationStore from "../../stores/usePaginationStore";
import { ToastContainer } from "react-toastify";

const ProviderList = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { pageSize, page, setTotalPages, keyword } = usePaginationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAll(
          token,
          logout,
          `https://sailgloble.com/admin/providers?limit=${pageSize}&page=${page}&keyword=${keyword}`
        );
        setRows(data.data);
        setTotalPages(data.page_count);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting Providers:", error);
      }
    };

    fetchData();
  }, [pageSize, page, keyword]);

  return (
    <>
      <TableComponent
        Endpoint={`https://sailgloble.com/admin/providers/delete/`}
        to=""
        setRows={setRows}
        rows={rows}
        columns={providerColumns}
        loading={loading}
      />
      {/* <ToastContainer autoClose="3000" position="top-center" /> */}
    </>
  );
};

export default ProviderList;
