import { Outlet, Route, Routes } from "react-router-dom";
import SidebarComponent from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import TableComponent from "../components/Table";
import { useState } from "react";
import Categories from "./category/Categories";
import useUserStore from "../stores/useUserStore";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    localStorage.getItem("collapsed") ? localStorage.getItem("collapsed") : true
  );
  // const [pinned, setPinned] = useState(
  //   localStorage.getItem("pinned") ? localStorage.getItem("pinned") : true
  // );
  const { pinned } = useUserStore();
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
          // pinned={pinned}
          // setPinned={setPinned}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        <main
          className="content"
          style={{
            width: `${pinned ? "calc(100% - 250px)" : "calc(100% - 80px)"}`,
            marginInlineStart: `${pinned ? "250px" : "80px"}`,
            transition: "all 0.5s ease-in-out, all 0.5s ease-in-out",
            // position: "relative",
            marginTop: "1rem",
          }}
        >
          <div>
            <Topbar />
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
