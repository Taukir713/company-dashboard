import {logoutUser} from "../../services/api/auth/authApi.js"
import {navigate} from "../../app/router.js" 
import getCurrUser from "../../utils/getCurrUser.js"; 
import { updateUser } from "../../services/api/auth/authApi.js";
import { showToast } from "../../utils/helper.js";

export default async function navbar() { 
    const {user} = await getCurrUser();
    return ` 
    <div class="topbar d-flex justify-content-between align-items-center"> 
        <div class="d-flex align-items-center gap-3"> 
            <button class="btn btn-dark mobile-menu-btn" id="mobileMenuBtn">
                <i class="fa-solid fa-bars"></i>
            </button>

            <h4 class="mb-0 fw-bold">
                Company Dashboard
            </h4> 
        </div> 

        <div class="d-flex align-items-center gap-3"> 
            <button class="btn btn-light " id="themeToggleBtn">
                <i class="fa-solid  ${user?.theme === "dark" ? "fa-sun" : "fa-moon"}"  id="themeIcon"></i>
            </button>

            <div class="dropdown"> 
                <button 
                    class="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                > 
                ${user?.username }
                </button>

                <ul class="dropdown-menu dropdown-menu-end"> 
                    <li>
                        <a class="dropdown-item" href="#/settings">
                            Settings
                        </a>
                    </li>

                    <li>
                        <button class="dropdown-item" id="logoutBtn">
                            Logout
                        </button>
                    </li> 
                </ul> 
            </div> 
        </div> 
    </div> 
    `;
}

export async function navbarEvents() { 
    const {user} = await getCurrUser();

    const logoutBtn = document.getElementById("logoutBtn"); 
    if (logoutBtn) { 
        logoutBtn.addEventListener("click", async function () { 
            try { 
               const res =  await logoutUser();  
                navigate("#/login"); 
            } catch (err) {
                console.log(err);
                showToast(err.response?.data?.message)
            } 
        });
    }

    const darkModeToggle = document.getElementById("darkModeToggle");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const icon = document.getElementById("themeIcon")

    if(user?.theme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    } 
    
    themeToggleBtn.addEventListener("click",async function () { 
        try {
            if(icon.classList.contains("fa-moon")) {  
                const response = await updateUser(user._id , {theme:"dark"}); 
                if(response.success) {
                    if(darkModeToggle){
                        darkModeToggle.checked = true;
                    }
                    icon.classList.replace("fa-moon" ,"fa-sun") 
                    document.documentElement.classList.toggle("dark");  
                }  
            }else if (icon.classList.contains("fa-sun")) {  
                const response = await updateUser(user._id , {theme:"light"}); 
                if(response.success ) {
                    if(darkModeToggle){
                        darkModeToggle.checked = false;
                    }  
                    icon.classList.replace( "fa-sun" ,"fa-moon")
                    document.documentElement.classList.toggle("dark"); 
                } 
            }
        }catch(err) { 
            showToast(err.response?.data?.message , "error")
        } 
    });
     
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (mobileMenuBtn) { 
        mobileMenuBtn.addEventListener("click", function () { 
            sidebar.classList.toggle("active");
            sidebarOverlay.classList.toggle("active"); 
        });
    }

    if (sidebarOverlay) { 
        sidebarOverlay.addEventListener("click", function () { 
            sidebar.classList.remove("active");
            sidebarOverlay.classList.remove("active"); 
        });
    }
}