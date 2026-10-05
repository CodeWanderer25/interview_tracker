import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="w-[84%]">
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout;