import { useEffect, useState } from "react";
import TableComponent from "../../components/Table";
import { getAll } from "../../network/network";
import { categoriesColumns } from "../../data/mockData";
import useUserStore from "../../stores/useUserStore";
import usePaginationStore from "../../stores/usePaginationStore";

const Categories = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const { pageSize, page, setTotalPages, keyword, setPage, setPageSize } =
    usePaginationStore();

  useEffect(() => {
    setPage(1);
    setPageSize(10);
  }, []);
  console.log("pageSize", pageSize);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAll(
          token,
          logout,
          `https://dev.sailgloble.com/admin/categories?limit=${pageSize}&page=${page}`
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
  }, [pageSize, page]);

  return (
    <>
      <TableComponent
        to="/addcategory"
        // Endpoint={`https://dev.sailgloble.com/admin/providers/delete/`}
        rows={rows}
        columns={categoriesColumns}
        loading={loading}
        add={"ADD NEW CATEGORY"}
      />
    </>
  );
};

export default Categories;
