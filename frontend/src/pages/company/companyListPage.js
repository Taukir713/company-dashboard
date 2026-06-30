import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import dataTable from "../../components/ui/dataTable.js";
import { getCompanies, deleteCompany } from "../../services/api/business/companyApi.js";
import { emptyState, showToast } from "../../utils/helper.js";

function createTableRow(arr,state) {
    let rows = []; 
    if(arr.length){
        return rows = arr.map((company) => `
            <tr> 
            <td>${company.name}</td> 
            <td>
                ${company.product.length} 
            </td> 
            
            <td> 
                <a href="#/company-product/${company._id}"
                    class="btn btn-outline-primary btn-sm  "   
                >
                    product
                </a>
                <a href="#/edit-company/${company._id}"
                    class="btn btn-outline-warning btn-sm  "   
                >
                    Edit
                </a>
                <button   class="btn btn-outline-danger btn-sm delete-company-btn"
                    data-id="${company._id}" 
                >
                    Delete
                </button> 
            </td> 
            </tr> `).join("");
        } else { 
            return rows = ` 
                <tr> 
                    <td colspan="3"> 
                        ${emptyState("No Companies Found")} 
                    </td> 
                </tr>` 
        }
}

export default async function companyListPage(params) {
    try {
        const app = document.getElementById("app");
        const response = await getCompanies();
        const rows = createTableRow(response.companies,emptyState)
        app.innerHTML = await layout(`
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        Companies
                    </h2>
    
                    <p class="text-secondary">
                        Manage all companies
                    </p> 
                </div>
                <a
                    href="#/add-company"
                    class="btn btn-outline-primary"
                >
                    Add Company
                </a> 
            </div> 
            ${dataTable(
                ["Company" , "Products" , "Actions"],
                rows
            )}
        `);
        await initializeLayoutEvents();
        const deleteBtns = document.querySelectorAll(".delete-company-btn");
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click" , async function (params) {
                try {
                    const id = this.dataset.id;
                    const deletedCompany = await deleteCompany(id);
                    if(deletedCompany) {
                        const row  = this.closest("tr");
                        row.remove();
                        showToast(deletedCompany.message); 
                    }
                }catch(err) {
                    showToast(err.response?.data?.message, "error");
                }
            })
        })
        
    }catch(err) {
        showToast(err.response?.data?.message, "error");
    }
}