import { useEffect, useState } from "react";
import TableComponent from "../components/Table";
import {
  complaintsColumns,
  complaintsData,
  coversColumns,
} from "../data/mockData";
import useUserStore from "../stores/useUserStore";
import { getAllCovers } from "../network/coverServices";
import { reviewsColumns } from "../data/mockData";
import { useTranslation } from "react-i18next";
import { Box, Button, ButtonGroup } from "@mui/material";

// export const getAllCategories = async () => {
//   const res = await axios.get("/api/categories");
//   return res.data;
// };

const Orders = () => {
  const [rows, setRows] = useState([]);
  const { token, logout } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("Pending");
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
      <Box display="flex" justifyContent="center" alignItems="center">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button
            onClick={() => setSelected("Pending")}
            style={{
              backgroundColor: selected === "Pending" ? "green" : "black",
            }}
          >
            {t("Pending")}
          </Button>
          <Button
            onClick={() => setSelected("Confirmed")}
            style={{
              backgroundColor: selected === "Confirmed" ? "green" : "black",
            }}
          >
            {t("Confirmed")}
          </Button>
          <Button
            onClick={() => setSelected("Finished")}
            style={{
              backgroundColor: selected === "Finished" ? "green" : "black",
            }}
          >
            {t("Finished")}
          </Button>
          <Button
            onClick={() => setSelected("Cancelled")}
            style={{
              backgroundColor: selected === "Cancelled" ? "green" : "black",
            }}
          >
            {t("Cancelled")}
          </Button>
        </ButtonGroup>
      </Box>
      {selected === "Pending" ? (
        <TableComponent
          to=""
          rows={complaintsData}
          columns={complaintsColumns}
          loading={loading}
        />
      ) : selected === "Confirmed" ? (
        <>omaomomomomaomomomaomomomocccccc</>
      ) : selected === "Finished" ? (
        <>dasfdfasdfsadfsadfadsfasfadsfdsa</>
      ) : (
        "asdfasdf"
      )}
    </>
  );
};

export default Orders;
