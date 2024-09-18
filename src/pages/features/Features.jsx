import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { coversColumns, featuresColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import usePaginationStore from "../../stores/usePaginationStore";
import { getAll } from "../../network/network";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Features = () => {
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
          `https://sailgloble.com/admin/app_settings/features`
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
        to="/addfeature"
        // Endpoint={`https://sailgloble.com/admin/providers/delete/`}
        rows={rows}
        columns={featuresColumns}
        loading={loading}
        add={"ADD NEW FEATURE"}
      />
    </>
  );
};

export default Features;
