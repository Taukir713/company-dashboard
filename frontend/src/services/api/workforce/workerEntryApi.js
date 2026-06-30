import api from "../api.js";

export async function getWorkerEntries(page,limit,q) {
    const response = await api.get(`/worker-entries?page=${page}&limit=${limit}&q=${q}`);
    return response.data;
}

export async function createWorkerEntry(data) {
    const response = await api.post("/worker-entries", data);
    return response.data;
}

export async function editWorkerEntry(id) {
    const response = await api.get(`/worker-entries/${id}/edit`);
    return response.data;
}

export async function updateWorkerEntry(id,data) {
    const response = await api.patch(`/worker-entries/${id}`,data);
    return response.data;
}

export async function deleteWorkerEntry(id) {
    const response = await api.delete(`/worker-entries/${id}`);
    return response.data;
}