import layout , {initializeLayoutEvents}from "../../components/layout/layout.js";
import {getCompanies} from "../../services/api/business/companyApi.js"
import companyEntryForm from "../../components/forms/business/companyEntryForm.js"
import {createCompanyEntry} from "../../services/api/business/companyEntryApi.js"
import {showToast} from "../../utils/helper.js";
import {navigate} from "../../app/router.js" 
import { validateCompanyEntry } from "../../validations/companyValidation.js";

export default async function addComponentEntryPage(params) {
    try {
        const app = document.getElementById("app");
        const response = await getCompanies();  
        app.innerHTML = await layout(` 
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Add Company Entry
                </h2>

                <p class="text-secondary">
                    Create company entry
                </p> 
            </div>
            ${companyEntryForm(response.companies)}
        `);
        await initializeLayoutEvents();
        const companySelect = document.getElementById("companyId");
        const productSelect = document.getElementById("productId");

        companySelect.addEventListener("change" , function() { 
            const selectedCompany = response.companies.find( (company) => company._id === this.value ) 
            productSelect.innerHTML = "<option value='' selected disabled> Select Product </option>"
            selectedCompany?.product.forEach(product => { 
                productSelect.innerHTML += `
                    <option value="${product._id}" >
                        ${product.name}
                    </option>
                `
            });
        })
        const form = document.getElementById("companyEntryForm");
        form.addEventListener("submit", async function (e) {
            try{
                e.preventDefault();
                const data = {
                    companyId: document.getElementById("companyId").value,
                    productId: document.getElementById("productId").value,
                    qty: document.getElementById("companyQty").value,
                    date: document.getElementById("companyDate").value
                }
                const {valid , message} = validateCompanyEntry(data);
                if(!valid){
                    showToast(message , "error");
                    return;
                }
                const newCompanyEntry = await createCompanyEntry(data);
                if(newCompanyEntry) {
                    navigate("#/company-entries" , true);
                    showToast(newCompanyEntry.message);
                }
            }catch(err) {
                showToast(err.response?.data?.message, "error")
            }
        })
    }catch(err) {
        showToast(err.response?.data?.message, "error")
    }
    
}