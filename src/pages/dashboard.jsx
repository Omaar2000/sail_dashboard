import { Route, Routes } from "react-router-dom";
import SidebarComponent from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import TableComponent from "../components/Table";

const Dashboard = () => {
  return (
    <>
      <div
        className="app"
        style={{
          display: "flex",
        }}
      >
        <SidebarComponent />
        <main className="content" style={{ width: "100%" }}>
          <Topbar />
          <TableComponent />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
