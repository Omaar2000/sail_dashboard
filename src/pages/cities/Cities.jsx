import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { citiesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import { getAll } from "../../network/network";
import usePaginationStore from "../../stores/usePaginationStore";

const Cities = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { pageSize, page, setTotalPages } = usePaginationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAll(
          token,
          logout,
          `api/admin/app_settings/cities?limit=${pageSize}&page=${page}`
        );

        setRows(data.data);
        setTotalPages(data.page_count);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchData();
  }, [pageSize, page]);

  return (
    <>
      <TableComponent
        to="/addcity"
        // Endpoint={`api/admin/providers/delete/`}
        rows={rows}
        columns={citiesColumns}
        loading={loading}
      />
    </>
  );
};

export default Cities;
