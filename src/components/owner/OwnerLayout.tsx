import React from "react";
import OwnerSidebar from "./OwnerSidebar";
import { Outlet } from "react-router-dom";

const OwnerLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <OwnerSidebar />
      <main className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default OwnerLayout;
