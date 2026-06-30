import api from "../api.js";

export async function getCompanyEntries(page,limit,q) {
    const response = await api.get(`/company-entries?page=${page}&limit=${limit}&q=${q}`);
    return response.data;
}

export async function createCompanyEntry(data) {
    const response = await api.post("/company-entries", data);
    return response.data;
}

export async function editCompanyEntry(id) {
    const response = await api.get(`/company-entries/${id}/edit`);
    return response.data;
}

export async function updateCompanyEntry(id,data) {
    const response = await api.patch(`/company-entries/${id}`,data);
    return response.data;
}

export async function deleteCompanyEntry(id) {
    const response = await api.delete(`/company-entries/${id}`);
    return response.data;
}