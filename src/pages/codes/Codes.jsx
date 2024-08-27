import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { codesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import usePaginationStore from "../../stores/usePaginationStore";
import { getAll } from "../../network/network";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Codes = () => {
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
          `api/admin/app_settings/country_code?limit=${pageSize}&page=${page}`
        );

        setRows(data.data);
        setTotalPages(data.page_count);

        console.log(data);
      } catch (error) {
        console.error("Error fetching Codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageSize, page]);

  //
  return (
    <>
      <TableComponent
        to="/addcode"
        // Endpoint={`api/admin/providers/delete/`}
        rows={rows}
        columns={codesColumns}
        loading={loading}
        add={"ADD NEW Code"}
      />
    </>
  );
};

export default Codes;
