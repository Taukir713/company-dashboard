import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import { editCompany, updateCompany } from "../../services/api/business/companyApi.js";
import companyForm from "../../components/forms/business/companyForm.js";
import { showToast } from "../../utils/helper.js";
import { navigate } from "../../app/router.js"; 
import {validateCompany} from "../../validations/companyValidation.js";

export default async function editCompanyPage(id) {
    try {
        const response = await editCompany(id);  
        const app = document.getElementById("app");
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Edit  Company
                </h2>

                <p class="text-secondary">
                    Update company
                </p> 
            </div>
            ${companyForm(response.company)}
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
                const updatedCompany = await updateCompany(id,{name})
                if(updatedCompany) {
                    navigate("#/companies",true);
                    showToast(updatedCompany.message);
                }
            }catch(err) {
                showToast(err.response?.data?.message , "error");
            }
        })    
    }catch(err) {
        console.log(err)
        showToast(err.response?.data?.message, "error")
    }

    
}