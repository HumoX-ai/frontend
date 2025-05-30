import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./components/ProtectedRoute"; // ProtectedRoute ni import qilamiz
import VenuesPage from "./pages/VenuesPage";
import VenueDetailPage from "./pages/VenueDetailPage";
import AdminPage from "./pages/AdminPage";
import AdminVenuesPage from "./pages/AdminVenuesPage";
import AdminBookingsPage from "./pages/AdminBookingsPage";
import AdminLayout from "./components/admin/AdminLayout"; // Import AdminLayout
import OwnerLayout from "./components/owner/OwnerLayout"; // Import OwnerLayout
import OwnerVenuesPage from "./pages/OwnerVenuesPage"; // Import OwnerVenuesPage
import OwnerBookingsPage from "./pages/OwnerBookingsPage"; // Import OwnerBookingsPage

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/venues" element={<VenuesPage />} />
            <Route path="/venues/:id" element={<VenueDetailPage />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="owners" replace />} />
              <Route path="owners" element={<AdminPage />} />
              <Route path="venues" element={<AdminVenuesPage />} />
              <Route path="bookings" element={<AdminBookingsPage />} />
              {/* Add other admin nested routes here if needed, e.g., /admin/owners */}
            </Route>

            {/* Owner routes */}
            <Route path="/venue-owner" element={<ProtectedRoute />}>
              <Route element={<OwnerLayout />}>
                <Route index element={<Navigate to="venues" replace />} />
                <Route path="venues" element={<OwnerVenuesPage />} />
                <Route path="bookings" element={<OwnerBookingsPage />} />
              </Route>
            </Route>

            {/* Kirgan foydalanuvchilar uchun yo'llar */}

            {/* Faqat kirmagan foydalanuvchilar uchun yo'llar */}
            <Route
              element={<ProtectedRoute isAuthRoute={true} redirectPath="/" />}
            >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Kelajakda faqat kirgan foydalanuvchilar uchun yo'llar uchun misol:
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfilePage />} />
            </Route>
            */}
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
