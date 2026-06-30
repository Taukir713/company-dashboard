import api from "../api.js";

export async function signupUser(data) {
    const response = await api.post("/company-dashboard/auth/signup", data)
    return response.data;
}

export async function loginUser(data) {
    const response = await api.post("/company-dashboard/auth/login", data)
    return response.data;
}

export async function logoutUser(data) {
    const response = await api.post("/company-dashboard/auth/logout")
    return response.data;
}

export async function getCurrentUser(data) {
    const response = await api.get("/company-dashboard/auth/me")
    return response.data;
}

export async function getApprovedUsers() {
    const response = await api.get("/company-dashboard/auth/approved-users")
    return response.data;
}

export async function getPendingUsers() {
    const response = await api.get("/company-dashboard/auth/pending-users")
    return response.data;
}

export async function updateUserRole(id , data) {
    const response = await api.patch(`/company-dashboard/auth/update-user-access/${id}` , data)
    return response.data
}

export async function updateUser(id , data) {
    const response = await api.patch(`/company-dashboard/auth/update-user/${id}` , data)
    return response.data
}