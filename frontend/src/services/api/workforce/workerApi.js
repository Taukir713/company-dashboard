import api from "../api.js";

export async function getWorkers() {
    const response = await api.get("/workers");
    return response.data;
}

export async function  createWorker(data) {
    const response = await api.post("/workers" , data)
    return response.data; 
}

export async function editWorker(id) {
    const response = await api.get(`/workers/${id}/edit`);
    return response.data;
}

export async function updateWorker(id,data) {
    const response = await api.patch(`/workers/${id}` , data);
    return response.data;
}

export async function deleteWorker(id) {
    const response = await api.delete(`/workers/${id}`);
    return response.data;
}
