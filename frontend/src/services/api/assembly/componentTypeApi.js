import api from "../api.js"; 

export async function getTypes() {
    const response = await api.get(`/types`);
    return response.data;
}

export async function  createComponentType(id,data) {
    const response = await api.post(`/components/${id}/type` , data)
    return response.data; 
}
 
export async function getComponentTypes(id) {
    const response = await api.get(`/components/${id}/type`);
    return response.data;
} 

export async function editComponentType(id,typeId) {
    const response = await api.get(`/components/${id}/type/${typeId}/edit`);
    return response.data;
}

export async function updateComponentType(id,typeId,data) {
    const response = await api.patch(`/components/${id}/type/${typeId}` , data);
    return response.data;
}

export async function deleteComponentType(id,typeId) {
    const response = await api.delete(`/components/${id}/type/${typeId}`);
    return response.data;
}
