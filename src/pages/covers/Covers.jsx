import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { coversColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import usePaginationStore from "../../stores/usePaginationStore";
import { getAll } from "../../network/network";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Covers = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getAll(
          token,
          logout,
          `https://sailgloble.com/admin/sliders`
        );

        setRows(data.data);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching covers:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TableComponent
        to="/addcover"
        // Endpoint={`https://sailgloble.com/admin/providers/delete/`}
        rows={rows}
        columns={coversColumns}
        loading={loading}
        add={"ADD NEW COVER"}
      />
    </>
  );
};

export default Covers;
