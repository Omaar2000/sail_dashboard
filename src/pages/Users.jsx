import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import useUserStore from "../stores/useUserStore";
import { userColumns } from "../data/mockData";
import { deleteUser } from "../network/usersServices";
import usePaginationStore from "../stores/usePaginationStore";
import { getAll } from "../network/network";

const Users = () => {
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
          `api/admin/clients?limit=${pageSize}&page=${page}&keyword=${keyword}`
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
        to=""
        Endpoint={`api/admin/clients/delete/`}
        rows={rows}
        columns={userColumns}
        loading={loading}
      />
    </>
  );
};

export default Users;
