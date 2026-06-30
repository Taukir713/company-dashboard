import api from "../api.js";

export async function getAssemblers() {
    const response = await api.get("/assemblers");
    return response.data;
}

export async function  createAssembler(data) { 
    const response = await api.post("/assemblers" , data)
    return response.data;
    
}

export async function editAssembler(id) {
    const response = await api.get(`/assemblers/${id}/edit`); 
    return response.data;
}

export async function updateAssembler(id,data) { 
    const response = await api.patch(`/assemblers/${id}` , data);
    return response.data; 
}

export async function deleteAssembler(id) {
    const response = await api.delete(`/assemblers/${id}`);
    return response.data;
}
