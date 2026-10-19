import { getToken, getUser } from "../services/authService";

// Satu-satunya daftar role yang dikenal sistem
export const ROLES = {
  ADMIN: "admin",
  KASIR: "kasir",
};

// Ambil role user yang sedang login.
// Backend mengirim `frontendRole` (sudah dipetakan jadi admin/kasir).
// Hasil: "admin", "kasir", atau null jika belum login / role tidak dikenal.
export const getRole = () => {
  const user = getUser();
  if (!user) return null;

  const role = String(user.frontendRole || user.role || "")
    .trim()
    .toLowerCase();

  return Object.values(ROLES).includes(role) ? role : null;
};

export const isAdmin = () => getRole() === ROLES.ADMIN;
export const isKasir = () => getRole() === ROLES.KASIR;

// Sudah login dan datanya valid
export const isLoggedIn = () => Boolean(getToken() && getUser());

// Halaman utama tiap role
export const getHomePath = (role = getRole()) => {
  if (role === ROLES.ADMIN) return "/dashboard";
  if (role === ROLES.KASIR) return "/pos";
  return "/login";
};