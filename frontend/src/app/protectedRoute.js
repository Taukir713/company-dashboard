import getCurrUser from "../utils/getCurrUser.js";
import {showToast} from "../utils/helper.js";
import { navigate } from "../app/router.js"; 
import accessDeniedHandler from "./accessDeniedHandler.js";

export default async function protectedRoute(callback ) {
    try {
        const currUser = await getCurrUser();  
        const user = currUser?.user; 
        if(!user) { 
            navigate("#/login"); 
            showToast("Login To Get Access" , "error");
            return;
        } else if(user?.role === "admin" || user?.role === "manager") { 
            await callback();  
            return;
        } 
        accessDeniedHandler(); 
    }catch(err) { 
        showToast(err.response?.data?.message, "error")
    }
}

export async function adminRoute(callback) {
    try { 
        const currUser = await getCurrUser(); 
        const user = currUser?.user;
        if(!user) { 
            navigate("#/login"); 
            showToast("Login To Get Access" , "error"  );
            return;
        }
        if(user?.role !== "admin") {
            accessDeniedHandler();
            return;
        }
        await callback();
    }catch(err) { 
        showToast(err.response?.data?.message, "error" || "Something Went Wrong" , "error")
    }
}

export async function authenticatedRoute(callback) {
    try {
        const currUser = await getCurrUser();  
        const user = currUser?.user; 
        if(!user) { 
            navigate("#/login",true); 
            showToast("Login To Get Access" , "error");
            return
        } else if(user.status !== "approved") {
            showToast("Request Pending", ); 
            return
        }
        await callback(); 
    }catch(err) { 
        showToast(err.response?.data?.message, "error" || "Something Went Wrong" , "error")
    }
}
