import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { countriesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import { getAll } from "../../network/categoriesServices";
import usePaginationStore from "../../stores/usePaginationStore";

const Countries = () => {
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
          `api/admin/app_settings/countries?limit=${pageSize}&page=${page}`
        );

        setRows(data.data);
        setTotalPages(data.page_count);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, [pageSize, page]);

  return (
    <>
      <TableComponent
        to="/addcountry"
        rows={rows}
        columns={countriesColumns}
        loading={loading}
      />
    </>
  );
};

export default Countries;
