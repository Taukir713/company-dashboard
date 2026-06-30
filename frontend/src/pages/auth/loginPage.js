import loginForm from "../../components/forms/auth/login.js";
import {loginUser} from "../../services/api/auth/authApi.js"
import { validateLogin } from "../../validations/authValidation.js";
import {showToast} from "../../utils/helper.js";
import {navigate} from "../../app/router.js";

export default async function LoginPage() { 
    const app = document.getElementById("app");
    app.innerHTML =  ` 
    <div class="auth-wrapper"> 
        <div class="auth-card"> 
            <h2 class="auth-title mb-2">
                Welcome Back
            </h2>

            <p class="text-secondary auth-subtitle mb-4">
                Login to continue
            </p> 
            ${loginForm()}
            <p class="mt-4 auth-subtitle text-center"> 
                Don't have an account? 
                <a href="#/signup">
                    Signup
                </a> 
            </p> 
        </div> 
    </div> 
    `;
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async function (e) {
        try{
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const {valid, message} = validateLogin({username,password});
            if(!valid) {
                showToast(message, "error");
                return;
            } 
            const response = await loginUser({username,password});   
            navigate("#/dashboard", true);
            showToast(response?.message  ) 
        }catch(err){  
            console.log(err.response)
            showToast(err.response?.data.message , "error") 
        }
    })
}