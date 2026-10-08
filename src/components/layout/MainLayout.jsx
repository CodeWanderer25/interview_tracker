import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import AddProject from "../../pages/Machine/AddProject";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar />
      {/* <AddProject/> */}

      {/* Main Content */}
      <main className="w-[84%]">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;