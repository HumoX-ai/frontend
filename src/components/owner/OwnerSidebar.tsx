import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BookMarked, Building } from "lucide-react"; // Assuming lucide-react for icons

const OwnerSidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    // Check if the current location starts with the given path
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 space-y-2">
      <h2 className="text-xl font-semibold mb-4">Owner Panel</h2>
      <nav>
        <ul>
          <li>
            <Link
              to="/venue-owner/venues"
              className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                isActive("/venue-owner/venues") ? "bg-gray-700" : ""
              }`}
            >
              <Building size={20} className="mr-2" />
              My Venues
            </Link>
          </li>
          <li>
            <Link
              to="/venue-owner/bookings"
              className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                isActive("/venue-owner/bookings") ? "bg-gray-700" : ""
              }`}
            >
              <BookMarked size={20} className="mr-2" />
              Venue Bookings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default OwnerSidebar;
