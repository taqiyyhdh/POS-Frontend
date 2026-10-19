import api from "./api";

// LOGIN
export const login = async (username, password) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  const data = response.data;

  // Simpan JWT
  localStorage.setItem("token", data.token);

  // Simpan data user
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// AMBIL TOKEN
export const getToken = () => {
  return localStorage.getItem("token");
};

// AMBIL USER (null jika belum ada atau datanya rusak)
export const getUser = () => {
  const user = localStorage.getItem("user");
  if (!user) return null;

  try {
    const parsed = JSON.parse(user);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};

// CEK LOGIN
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};