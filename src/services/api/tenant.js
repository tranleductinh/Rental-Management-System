import api from "../api/index.js";

export const getTenant = async () => {
  return await api.get("/api/tenants");
};

export const createTenant = async (payload) => {
  return await api.post("/api/tenants", payload);
};

export const updateTenant = async (id, payload) => {
  return await api.put(`/api/tenants?id=${id}`, payload);
}

export const deleteTenant = async (id) => {
  return await api.delete(`/api/tenants?id=${id}`);
}