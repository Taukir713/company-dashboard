import CONFIG from "../../config/config.js";

const api = axios.create({
    BASE_URL: CONFIG.BASE_URL,
    withCredentials: true
})

export default api