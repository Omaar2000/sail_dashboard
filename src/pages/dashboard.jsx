import { Outlet, Route, Routes } from "react-router-dom";
import SidebarComponent from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import TableComponent from "../components/Table";
import { useState } from "react";
import Categories from "./Categories";

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
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
