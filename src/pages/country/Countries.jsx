import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { countriesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import { getAll } from "../../network/network";
import usePaginationStore from "../../stores/usePaginationStore";
import { ToastContainer } from "react-toastify";

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
          `https://sailgloble.com/admin/app_settings/countries?limit=${pageSize}&page=${page}`
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
        // Endpoint={`https://sailgloble.com/admin/app_settings/countries/delete/`}
        columns={countriesColumns}
        loading={loading}
        add={"ADD NEW COUNTRY"}
      />

      {/* <ToastContainer autoClose="3000" position="top-center" /> */}
    </>
  );
};

export default Countries;
