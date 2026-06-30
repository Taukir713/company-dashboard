import signupForm from "../../components/forms/auth/signup.js";
import {signupUser} from "../../services/api/auth/authApi.js"
import { validateSignup } from "../../validations/authValidation.js";
import {showToast } from "../../utils/helper.js";
import {navigate} from "../../app/router.js";

export default async function signupPage(params) {
    const app = document.getElementById("app"); 
    app.innerHTML = ` 
    <div class="auth-wrapper"> 
        <div class="auth-card"> 
            <h2 class="auth-title mb-2">
                Create Account
            </h2>

            <p class="text-secondary auth-subtitle mb-4">
                Signup to continue
            </p> 
            ${signupForm()}
            <p class="mt-4 text-center auth-subtitle"> 
                Already have an account? 
                <a href="#/login">
                    Login
                </a> 
            </p> 
        </div> 
    </div> 
    `;
    const form = document.getElementById("signupForm");
    form.addEventListener("submit" , async function (e) {
        try{
            e.preventDefault();
            const username = document.getElementById("signupUsername").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const {valid, message} = validateSignup({username,email,password});
            if(!valid) {
                showToast(message, "error");
                return;
            }
            const response = await signupUser({username,email,password}); 
            showToast(response.message )
            
        }catch(err) {
            console.log(err.response);
            showToast(err.response?.data?.message, "error")
        }
    })
}