import layout  , {initializeLayoutEvents} from "../../components/layout/layout.js";
import { getAssemblerEntries ,deleteAssemblerEntry } from "../../services/api/assembly/assemblerEntryApi.js";
import dataTable from "../../components/ui/dataTable.js";
import { showToast , emptyState , formatDate } from "../../utils/helper.js";
import getCurrUser from "../../utils/getCurrUser.js"; 
import { pagination ,initializePagination } from "../../components/ui/pagination.js";  

function createTableRow(arr,state) { 
    let rows = [];
    if(arr.length) {
        return rows = arr.map((entry) => `
            <tr>  
                <td>${entry.assemblerId?.name || "deleted"}</td> 
                <td>${entry.componentId?.name || "deleted"}</td>
                <td>${entry.typeId?.name || "deleted"}</td>
                <td>${entry.qty.toLocaleString("en-In")}</td>
                <td> 
                    ${!entry.retrieve ? 
                        `<span class="badge bg-warning">
                            Pending
                        </span>` : 
                        `<span class="badge bg-success">
                            Retrieved
                        </span>`
                    }
                </td>
                <td>${formatDate(entry.date)}</td> 
                <td>
                    <a href="#/edit-assembler-entry/${entry._id}"
                        class="btn btn-outline-warning btn-sm  "   
                    >
                        Edit
                    </a>
                    <button   class="btn btn-outline-danger btn-sm delete-assembler-entry-btn"
                        data-entry-id="${entry._id}"  
                    >
                        Delete
                    </button> 
                    ${entry.updatedAt !== entry.createdAt? 
                        `<span class="badge bg-info">
                            <i class="fa-solid fa-pen-to-square"></i> Edited
                        </span>` : 
                        ""
                    }
                </td>
            </tr> `).join("")  
    }else {  
          return  rows = ` 
                <tr> 
                    <td colspan="9"> 
                       ${state("Assembler Entry Not Found")} 
                    </td> 
                </tr>`  
        } 
}

export default async function assemblerEntryListPage() {
    try {  
 
        const hash = window.location.hash;
        const query = hash.split("?")[1];
        const params = new URLSearchParams(query); 

        const page = Number(params.get("page")) || 1; 
        const limit = 10;     
        const q = params.get("q") || "";   
        
        const app = document.getElementById("app");
        const response = await getAssemblerEntries(page,limit,q);  
        const rows = createTableRow(response.assemblerEntries ,emptyState);   
        app.innerHTML = await layout(`
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        Assembler Entries
                    </h2>
    
                    <p class="text-secondary">
                        Manage assembly logs
                    </p> 
                </div>  
                
                <a
                    href="#/add-assembler-entry"
                    class="btn btn-outline-primary"
                >
                    Add Entry
                </a> 
            </div>

            <div class="container-fluid mb-4 ">
                <form class="d-flex search-bar " role="search" id="assemblerEntrySearchForm" >
                    <input class="form-control me-2" value="${q || ""}" type="search" id="assemblerEntrySearch" placeholder="Search Entry"   aria-label="Search"/>
                    <button class="btn btn-outline-success" id="assemblerEntrySearchBtn" >Search</button>
                </form>
                
            </div> 
            
            ${dataTable( 
                [
                    "Assembler" ,
                    "Component" , "Type" ,
                    "Qty" ,"Status" ,
                    "Date" ,
                    "Actions"
                ],
                rows
            )}
             
            ${pagination(response.currentPage, response.totalPages)}
        `);   

       await initializeLayoutEvents()

        initializePagination( 
            function() { 
                window.location.hash = `#/assembler-entries?page=${page+1}&q=${q || ""}`;  
            },
            function(){
                window.location.hash = `#/assembler-entries?page=${page-1}&q=${q || ""}`; 
            }
        );

        const deletedBtns = document.querySelectorAll(".delete-assembler-entry-btn");
        deletedBtns.forEach((btn) => {
            btn.addEventListener("click" , async function (params) { 
                try { 
                    const id = this.dataset.entryId
                    const deletedAssemblerEntry = await deleteAssemblerEntry(id);
                    if(deletedAssemblerEntry){
                        const row = this.closest("tr");
                        row.remove();
                        showToast(deletedAssemblerEntry.message)
                    }
                } catch(err) {
                    console.log(err)
                    showToast(err.response?.data?.message, "error");
                }
            })
        })

        const form = document.getElementById("assemblerEntrySearchForm");
        const searchInput = document.getElementById('assemblerEntrySearch'); 
        form.addEventListener("submit" , async function (e) {
            e.preventDefault();
            const q = searchInput.value;
            window.location.hash = `#/assembler-entries/search?page=1&q=${q}`
        })

        searchInput.addEventListener('input', function () {
            if (this.value === "") { 
                searchInput.value = ""; 
                window.location.hash = `#/assembler-entries?page=1`;
            }
        });
         
    }catch(err) {
        console.log(err)
        showToast(err.response?.data?.message, "error");
    }
}




