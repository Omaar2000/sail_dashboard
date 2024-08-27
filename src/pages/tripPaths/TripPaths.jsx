import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import useUserStore from "../../stores/useUserStore";
import { deletePath } from "../../network/pathsServices";
import { pathsColumns } from "../../data/mockData";
import { ToastContainer } from "react-toastify";
import { getAll } from "../../network/network";
import usePaginationStore from "../../stores/usePaginationStore";

const TripPaths = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { keyword, pageSize, page, setTotalPages } = usePaginationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAll(
          token,
          logout,
          `https://dev.sailgloble.com/admin/trip_path?limit=${pageSize}&page=${page}&keyword=${keyword}`
        );

        setRows(data.data);
        setTotalPages(data.page_count);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching paths:", error);
      }
    };

    fetchData();
  }, [pageSize, page, keyword]);

  return (
    <>
      <TableComponent
        to="/addpath"
        Endpoint={`https://dev.sailgloble.com/admin/trip_path/delete/`}
        rows={rows}
        columns={pathsColumns}
        loading={loading}
        add={"ADD NEW Path"}
      />
      <ToastContainer autoClose="3000" position="top-center" />
    </>
  );
};

export default TripPaths;
