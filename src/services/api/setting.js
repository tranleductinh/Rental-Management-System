import api from ".";

export const getSettings = async () => {
    return await api.get("/api/settings");
};

export const updateSetting = async (payload) => {
    return await api.put(`/api/settings`, payload);
};