import api from "../api.js";

export async function getCompanyProducts(id) {
    const response = await api.get(`/company/${id}/product`);
    return response.data;
}

export async function  createCompanyProduct(id,data) {
    const response = await api.post(`/company/${id}/product` , data)
    return response.data;
    
}

export async function editCompanyProduct(id,prodId) {
    const response = await api.get(`/company/${id}/product/${prodId}/edit`);
    return response.data;
}

export async function updateCompanyProduct(id,prodId,data) {
    const response = await api.patch(`/company/${id}/product/${prodId}` , data);
    return response.data;
}

export async function deleteCompanyProduct(id,prodId) {
    const response = await api.delete(`/company/${id}/product/${prodId}`);
    return response.data;
}
