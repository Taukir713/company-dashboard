import api from "../api.js";

export async function getAssemblerEntries(page,limit,q) {
    const response = await api.get(`/assembler-entries?page=${page}&limit=${limit}&q=${q} `);
    return response.data;
}

export async function createAssemblerEntry(data) {
    const response = await api.post("/assembler-entries", data);
    return response.data;
}

export async function editAssemblerEntry(id) {
    const response = await api.get(`/assembler-entries/${id}/edit`);
    return response.data;
}

export async function updateAssemblerEntry(id,data) {
    const response = await api.patch(`/assembler-entries/${id}`,data);
    return response.data;
}

export async function deleteAssemblerEntry(id) {
    const response = await api.delete(`/assembler-entries/${id}`);
    return response.data;
}