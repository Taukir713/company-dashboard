import api from "../api.js";

export async function getComponents() {
    const response = await api.get("/components");
    return response.data;
}

export async function  createComponent(data) {
    const response = await api.post("/components" , data)
    return response.data; 
}

export async function editComponent(id) {
    const response = await api.get(`/components/${id}/edit`);
    return response.data;
}

export async function updateComponent(id,data) {
    const response = await api.patch(`/components/${id}` , data);
    return response.data;
}

export async function deleteComponent(id) {
    const response = await api.delete(`/components/${id}`);
    return response.data;
}