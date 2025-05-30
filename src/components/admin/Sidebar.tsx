import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-2">
      <nav>
        <ul>
          <li>
            <NavLink
              to="/admin/owners"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Owners
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/venues"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Venues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                `block py-2 px-4 rounded ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`
              }
            >
              Bookings
            </NavLink>
          </li>
          {/* Add more admin links here as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
