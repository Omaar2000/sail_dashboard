import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { getAllCategories } from "../../network/categoriesServices";
import { codesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
// import { getAllCountries } from "../../network/countriesServices";
import { getAllCodes } from "../../network/codesServices";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Codes = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllCodes(token, logout);
        setRows(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching Codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //
  return (
    <>
      <TableComponent
        to="/addcode"
        rows={rows}
        columns={codesColumns}
        loading={loading}
      />
    </>
  );
};

export default Codes;
