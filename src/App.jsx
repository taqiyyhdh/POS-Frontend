import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Product from "./pages/Product";
import Category from "./pages/Category";
import HomePage from "./pages/HomePage";
import LaporanPenjualan from "./pages/Reports/Report";
import Pos from "./pages/Pos";
import TransactionHistory from "./pages/TransactionHistory";
import ProtectedRoute from "./components/ProtectedRoute";
import LaporanUangKeluar from "./pages/Reports/LaporanUangKeluar";
import { getRole, getHomePath, isLoggedIn } from "./utils/auth";

// Komponen pembatas: Jika sudah login, dilarang masuk ke halaman login.
// Admin diarahkan ke dashboard, kasir diarahkan ke POS.
function PublicOnlyRoute({ children }) {
  const role = getRole();

  if (isLoggedIn() && role) {
    return <Navigate to={getHomePath(role)} replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Halaman umum / Publik */}
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/login" 
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        } 
      />

      {/* Khusus Admin */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Product />
          </ProtectedRoute>
        }
      />

      <Route
        path="/category"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Category />
          </ProtectedRoute>
        }
      />

      <Route
        path="/laporan"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <LaporanPenjualan />
          </ProtectedRoute>
        }
      />

      {/* Kasir dan Admin boleh mengakses Kasir (POS) */}
      <Route
        path="/pos"
        element={
          <ProtectedRoute allowedRoles={["admin", "kasir"]}>
            <Pos />
          </ProtectedRoute>
        }
      />

      {/* Kasir dan Admin boleh mengakses Riwayat Transaksi */}
      <Route
        path="/transactions"
        element={
          <ProtectedRoute allowedRoles={["admin", "kasir"]}>
            <TransactionHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/laporan-uang-keluar"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <LaporanUangKeluar />
          </ProtectedRoute>
        }
      />

      {/* URL tidak dikenal */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;