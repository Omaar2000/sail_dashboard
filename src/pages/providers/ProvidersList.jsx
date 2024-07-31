import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import useUserStore from "../../stores/useUserStore";
import { deleteOneProvider } from "../../network/providersServices";
import { providerColumns } from "../../data/mockData";
import { getAll } from "../../network/categoriesServices";
import usePaginationStore from "../../stores/usePaginationStore";

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
          `api/admin/providers?limit=${pageSize}&page=${page}&keyword=${keyword}`
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
        Delete={deleteOneProvider}
        to=""
        setRows={setRows}
        rows={rows}
        columns={providerColumns}
        loading={loading}
      />
    </>
  );
};

export default ProviderList;
