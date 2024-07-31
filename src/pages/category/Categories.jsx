import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { getAll } from "../../network/categoriesServices";
import { categoriesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import usePaginationStore from "../../stores/usePaginationStore";

const Categories = () => {
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
          `api/admin/categories?limit=${pageSize}&page=${page}&keyword=${keyword}`
        );
        setRows(data.data);
        setTotalPages(data.page_count);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, [pageSize, page, keyword]);

  return (
    <>
      <TableComponent
        to="/addcategory"
        rows={rows}
        columns={categoriesColumns}
        loading={loading}
      />
    </>
  );
};

export default Categories;
