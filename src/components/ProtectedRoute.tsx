import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "@/store";
import { selectCurrentUser } from "@/store/slices/authSlice";

interface ProtectedRouteProps {
  redirectPath?: string;
  isAuthRoute?: boolean; // Agar bu true bo'lsa, faqat kirmaganlar uchun, aks holda faqat kirganlar uchun
}

const ProtectedRoute = ({
  redirectPath = "/",
  isAuthRoute = false,
}: ProtectedRouteProps) => {
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  );

  const location = useLocation();

  if (isAuthRoute) {
    // Agar bu login/register kabi autentifikatsiya yo'li bo'lsa
    // va foydalanuvchi allaqachon kirgan bo'lsa, uni redirectPath ga (odatda asosiy sahifaga) yo'naltiramiz
    if (currentUser?.role === "user") {
      // Agar foydalanuvchi oddiy foydalanuvchi bo'lsa
      return <Navigate to={redirectPath} state={{ from: location }} replace />;
    } else if (currentUser?.role === "admin") {
      // Agar foydalanuvchi admin bo'lsa
      return <Navigate to="/admin" state={{ from: location }} replace />;
    } else if (currentUser?.role === "owner") {
      // Agar foydalanuvchi venueOwner bo'lsa
      return <Navigate to="/venue-owner" state={{ from: location }} replace />;
    }
  } else {
    // Agar bu oddiy himoyalangan yo'l bo'lsa (hozircha bizda bunday yo'q)
    // va foydalanuvchi kirmagan bo'lsa, uni login sahifasiga yo'naltiramiz
    if (!currentUser) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  }

  return <Outlet />; // Agar shartlar bajarilmasa, ichki kontentni (Route elementini) ko'rsatamiz
};

export default ProtectedRoute;
