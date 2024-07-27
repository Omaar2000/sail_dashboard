import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import {
  mockDataTeam,
  reviewsColumns,
  reviewsData,
  userColumns,
} from "../data/mockData";

const Reviews = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const data = await getAllCovers(token, logout);
        setRows(data);
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
        to=""
        rows={reviewsData}
        columns={reviewsColumns}
        loading={loading}
      />
    </>
  );
};

export default Reviews;
