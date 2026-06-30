import api from "../api.js";

export async function getReports(type,month,year) {
    const response = await api.get(`/reports?type=${type}&month=${month}&year=${year}`)
    return response.data
}