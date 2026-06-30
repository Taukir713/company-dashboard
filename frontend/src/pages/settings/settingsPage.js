import layout , {initializeLayoutEvents} from "../../../src/components/layout/layout.js";
import { updateUser } from "../../services/api/auth/authApi.js";
import getCurrUser from "../../utils/getCurrUser.js";
import { showToast } from "../../utils/helper.js";

export default async function settingsPage(params) {
    const app = document.getElementById("app");
    const {user} = await getCurrUser();
    app.innerHTML = await layout(` 
        <div class="mb-4"> 
            <h2 class="fw-bold">
                Settings
            </h2>

            <p class="text-secondary">
                Manage your account settings
            </p> 
        </div>

        <div class="row g-4"> 
            <div class="col-lg-6"> 
                <div class="form-card"> 
                    <h5 class="fw-bold mb-4">
                        User Information
                    </h5>

                    <div class="mb-3"> 
                        <label class="form-label">
                            Username
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            value="${user?.username}"
                            disabled
                        > 
                    </div>

                    <div class="mb-3"> 
                        <label class="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            class="form-control"
                            value="${user?.email}"
                            disabled
                        > 
                    </div>

                    <div class="mb-3"> 
                        <label class="form-label">
                            Role
                        </label>

                        <input
                            type="text"
                            class="form-control"
                            value="${user?.role}"
                            disabled
                        > 
                    </div> 
                </div> 
            </div>

            <div class="col-lg-6"> 
                <div class="form-card"> 
                    <h5 class="fw-bold mb-4">
                        Dashboard Preferences
                    </h5>

                    <div class="form-check form-switch mb-4"> 
                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="darkModeToggle"
                            ${user?.theme === "dark" ? "checked" :""}
                        >

                        <label class="form-check-label">
                            Enable Dark Mode
                        </label> 
                    </div>

                    <button
                        class="btn btn-outline-primary"
                        id="saveSettingsBtn"
                    >
                        Save Settings
                    </button> 
                </div> 
            </div> 
        </div> 
    `);
    await initializeLayoutEvents();
     
    if(user?.theme === "dark") {
        document.documentElement.classList.add("dark");
    }else {
        document.documentElement.classList.remove("dark");
    }
 
    const icon = document.getElementById("themeIcon")
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.addEventListener("click", async function () { 
        if(darkModeToggle.checked) { 
            icon.classList.replace("fa-moon" , "fa-sun")
            document.documentElement.classList.add("dark");
        }else { 
            icon.classList.replace("fa-sun","fa-moon")
            document.documentElement.classList.remove("dark");
        }
    });

   const saveSettingsBtn = document.getElementById("saveSettingsBtn");
   saveSettingsBtn.addEventListener("click" , async function () {
        try {
            const isChecked = darkModeToggle.checked;
            if(isChecked) {
                const response = await updateUser(user._id , {theme:"dark"});
                if(response.success) {
                    icon.classList.replace("fa-moon" , "fa-sun")
                    document.documentElement.classList.add("dark");
                    showToast("Setting Change to Dark Mode")
                }
            }else {
                const response = await updateUser(user?._id , {theme:"light"}); 
                if(response.success) {
                    icon.classList.replace("fa-sun","fa-moon")
                    document.documentElement.classList.remove("dark");
                    showToast("Setting Change to light Mode ")
                }
            }
        }catch(err) {
            console.log(err);
            showToast(err.response?.data?.message , "error")
        }
   })
         
    
}