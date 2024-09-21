import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import useUserStore from "../../stores/useUserStore";
import { providerColumns } from "../../data/mockData";
import { getAll } from "../../network/network";
import usePaginationStore from "../../stores/usePaginationStore";
import { ToastContainer } from "react-toastify";
import Ban from "../../components/Ban";

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

  // Function to update a specific row's name
  const updateRow = (id, newName) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, full_name: newName } : row
      )
    );
  };

  return (
    <>
      <TableComponent
        Endpoint={`https://sailgloble.com/admin/providers/delete/`}
        to=""
        setRows={setRows}
        rows={rows}
        columns={providerColumns.map((col) => {
          if (col.field === "Ban") {
            return {
              ...col,
              renderCell: ({ row }) => (
                <Ban
                  row={row}
                  banEndpoint={`https://sailgloble.com/admin/providers/ban/${row.id}`}
                  unbanEndpoint={`https://sailgloble.com/admin/providers/unban/${row.id}`}
                  updateRow={updateRow}
                />
              ),
            };
          }
          return col;
        })}
        loading={loading}
      />
    </>
  );
};

export default ProviderList;
