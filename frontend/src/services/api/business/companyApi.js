import api from "../api.js";

export async function getCompanies() {
    const response = await api.get("/company");
    return response.data;
}

export async function  createCompany(data) {
    const response = await api.post("/company" , data)
    return response.data;
    
}

export async function editCompany(id) {
    const response = await api.get(`/company/${id}/edit`);
    return response.data;
}

export async function updateCompany(id,data) {
    const response = await api.patch(`/company/${id}` , data);
    return response.data;
}

export async function deleteCompany(id) {
    const response = await api.delete(`/company/${id}`);
    return response.data;
}
