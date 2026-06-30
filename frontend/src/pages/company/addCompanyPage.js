import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import companyForm from "../../components/forms/business/companyForm.js";
import { showToast } from "../../utils/helper.js";
import { createCompany } from "../../services/api/business/companyApi.js";
import { navigate } from "../../app/router.js";
import {validateCompany} from "../../validations/companyValidation.js";

export default async function addCompanyPage(params) {
    try {
        const app = document.getElementById("app");
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Add Company
                </h2>

                <p class="text-secondary">
                    Create company
                </p> 
            </div>
            ${companyForm()}
        `)
        await initializeLayoutEvents();
        const form = document.getElementById("companyForm");
        form.addEventListener("submit" , async function (e) {
            try {
                e.preventDefault();
                const name = document.getElementById("companyName").value;
                const {valid , message} = validateCompany({name});
                if(!valid) {
                    showToast(message, "error");
                    return ;
                }
                const newCompany = await createCompany({name})
                if(newCompany) {
                    navigate("#/companies",true);
                    showToast(newCompany.message);
                }
            }catch(err) {
                showToast(err.response?.data?.message , "error");
            } 
        })
    }catch(err) {
        showToast(err.response?.data?.message , "error");
    }
}