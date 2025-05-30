import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom"; // Import Outlet

const AdminLayout: React.FC = () => {
  // Removed children prop
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
};

export default AdminLayout;
