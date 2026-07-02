import CONFIG from "../../config/config.js";

const api = axios.create({
    base_url: CONFIG.BASE_URL,
    withCredentials: true
})

export default api