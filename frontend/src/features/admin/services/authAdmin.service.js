import api from "@/shared/services/api";

const login = async ({ username, password }) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data;
};

export { login };
