import api from "../api/index.js";

export const getRooms = async () => {
  return await api.get("/api/rooms");
};
export const createRoom = async (payload) => {
  return await api.post("/api/rooms", payload);
};

export const updateRoom = async (id, payload) => {
  return await api.put(`/api/rooms?id=${id}`, payload);
};

export const deleteRoom = async (id) => {
  return await api.delete(`/api/rooms?id=${id}`);
};
