import api from ".";

export const getBills = async () => {
    return await api.get("/api/bills");
};

export const createBill = async (payload) => {
    return await api.post("/api/bills", payload);
}

export const updateBill = async (id, payload) => {
    return await api.put(`/api/bills?id=${id}`, payload);
}

export const deleteBill = async (id) => {
    return await api.delete(`/api/bills?id=${id}`);
}