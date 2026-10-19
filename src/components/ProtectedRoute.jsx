import { Navigate } from "react-router-dom";
import { logout } from "../services/authService";
import { getRole, getHomePath, isLoggedIn } from "../utils/auth";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  // Belum login, atau data user rusak: bersihkan lalu ke halaman login
  if (!isLoggedIn()) {
    logout();
    return <Navigate to="/login" replace />;
  }

  const role = getRole();

  // Role tidak dikenal
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Role dikenal tapi tidak berhak membuka halaman ini:
  // arahkan ke halaman utama miliknya
  if (!allowedRoles.includes(role)) {
    return <Navigate to={getHomePath(role)} replace />;
  }

  return children;
}