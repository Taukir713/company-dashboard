import layout, { initializeLayoutEvents } from "../../components/layout/layout.js";
import { getCompanies } from "../../services/api/business/companyApi.js";
import {editCompanyEntry , updateCompanyEntry} from "../../services/api/business/companyEntryApi.js";
import companyEntryForm from "../../components/forms/business/companyEntryForm.js"
import { showToast ,formatDate } from "../../utils/helper.js";
import {navigate} from  "../../app/router.js";
import { validateCompanyEntry } from "../../validations/companyValidation.js";

export default async function editCompanyEntryPage(id,oldUrl) {
    try {
        
        const app = document.getElementById("app");
        const response = await editCompanyEntry(id); 
        const companyResponse = await getCompanies();  
        const companies = companyResponse.companies
        const entry = response.companyEntry   

        const selectedCompany = companyResponse.companies.find((company) => company._id === entry.companyId._id)
        const products = selectedCompany.product
 
        const date = formatDate(entry.date)

        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Add Company Entry
                </h2>

                <p class="text-secondary">
                    Create company entry
                </p> 
            </div>
            ${companyEntryForm(companies ,products , entry ,date )}
        `);
        await initializeLayoutEvents();
        const companySelect = document.getElementById("companyId");
        const productSelect = document.getElementById("productId");

        companySelect.addEventListener("change" , function() {
            const selectedCompany = companyResponse.companies.find((company) => company._id === this.value)
            productSelect.innerHTML = "<option value='' selected disabled> Select Product</option>";
            selectedCompany.product.forEach((product) => {
                productSelect.innerHTML += `
                    <option value="${product._id}">  
                        ${product.name}
                    </option>

                `
            })

        })
        const form = document.getElementById("companyEntryForm");
        form.addEventListener("submit" , async function (e) {
            try{
                
                e.preventDefault();
                const data = {
                    companyId: document.getElementById("companyId").value,
                    productId: document.getElementById("productId").value,
                    qty: document.getElementById("companyQty").value,
                    dispatch: document.getElementById("status").value === "true",
                    date:  document.getElementById("companyDate").value
                }  
                const {valid , message} = validateCompanyEntry(data);
                if(!valid){
                    showToast(message , "error");
                    return;
                }
                const updatedCompanyEntry = await updateCompanyEntry(id,data);
                if(updatedCompanyEntry) {
                    const prevUrL = `#${oldUrl?.split("#")[1]}`; 
                    oldUrl ?  navigate(prevUrL,true) : navigate("#/company-entries",true) 
                    showToast(updatedCompanyEntry.message)
                }
            }catch(err) {
                console.log(err);
                showToast(err.response?.data?.message, "error")
            } 
        })
    }catch(err) {
        console.log(err);
        showToast(err.response?.data?.message, "error")
    } 
}