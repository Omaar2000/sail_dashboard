import { Outlet, Route, Routes } from "react-router-dom";
import SidebarComponent from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import TableComponent from "../components/Table";
import { useState } from "react";
import Categories from "./category/Categories";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("collapsed") ? localStorage.getItem("collapsed") : true
  );
  const [pinned, setPinned] = useState(
    localStorage.getItem("pinned") ? localStorage.getItem("pinned") : true
  );
  return (
    <>
      <div
        className="app"
        style={{
          display: "flex",
          border: "none",
        }}
      >
        <SidebarComponent
          pinned={pinned}
          setPinned={setPinned}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <main
          className="content"
          style={{
            width: `${pinned ? "81.5vw" : "95vw"}`,
            marginInlineStart: `${pinned ? "250px" : "80px"}`,
            transition: "all 0.5s ease-in-out, all 0.5s ease-in-out",
          }}
        >
          <Topbar />
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
