import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import dataTable from "../../components/ui/dataTable.js"; 
import {getAssemblers , deleteAssembler} from "../../services/api/assembly/assemblerApi.js";
import { emptyState , showToast } from "../../utils/helper.js";  

function createTableRow(arr,state) {
    let rows = [];
    if(arr.length) {
        return rows = arr.map((assembler) => `
            <tr> 
                <td>${assembler.name}</td> 
                <td> 
                    <a href="#/edit-assembler/${assembler._id}"
                        class="btn btn-outline-warning btn-sm edit-assembler-btn"   
                    >
                        Edit
                    </a>
                    <button   class="btn btn-outline-danger btn-sm delete-assembler-btn"
                        data-id="${assembler._id}" 
                    >
                        Delete
                    </button>  
                </td> 
            </tr>   `).join("") 
    } else { 
        return rows = ` 
            <tr> 
                <td colspan="2"> 
                    ${state("No Assemblers Found")} 
                </td> 
            </tr>` 
    }
}

export default async function assemblerListPage() { 
    try {
        const app = document.getElementById("app"); 
        const response = await getAssemblers();  
        
        const rows = createTableRow(response.assemblers ,emptyState)

        app.innerHTML = await layout(` 
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        Assemblers
                    </h2>
    
                    <p class="text-secondary">
                        Manage all assemblers
                    </p> 
                </div>
                 
                <a
                    href="#/add-assembler"
                    class="btn btn-outline-primary"
                >
                    Add Assembler
                </a> 
            </div> 
            ${dataTable( 
                ["Assembler","Actions"]  ,
                rows
            )} 
        `);

       await initializeLayoutEvents();

        const deleteBtns = document.querySelectorAll(".delete-assembler-btn")
         
        deleteBtns.forEach(btn => {
            btn.addEventListener("click" , async function () {  
                    try {
                        const id = this.dataset.id;
                        const deletedAssembler = await deleteAssembler(id);
                        if(deletedAssembler) {
                            const row = this.closest("tr");
                            row.remove()
                            showToast(deletedAssembler.message )
                        } 
                    } catch(err) { 
                        showToast(err.response?.data?.message , "error")
                    } 
            }) 
        })
    } catch(err) {
        console.log(err)
        showToast(err.response?.data?.message , "error")
    }
}

