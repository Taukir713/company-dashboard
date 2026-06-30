import {getCurrentUser} from "../services/api/auth/authApi.js";
import {showToast} from "../utils/helper.js";
 

export default async function getCurrUser(params) {
    try {
        const user = await getCurrentUser();  
        return user;
    }catch(err) { 
        showToast(err.response?.data?.message, "error");
    }
}
 
 
 