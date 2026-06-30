import layout , {initializeLayoutEvents}from "../../components/layout/layout.js"
import {getCompanyEntries , deleteCompanyEntry} from "../../services/api/business/companyEntryApi.js"
import dataTable from "../../components/ui/dataTable.js";
import {showToast , emptyState, formatDate} from "../../utils/helper.js" 
import {pagination , initializePagination} from "../../components/ui/pagination.js";

function createTableRow(arr,state) {
    let rows = []; 
    if(arr.length) {
        return rows = arr.map((entry) => ` 
        <tr> 
                <td>${entry.companyId.name || "deleted"}</td> 
                <td>${entry.productId.name || "deleted"}</td>
                <td>${entry.qty.toLocaleString()}</td> 
                <td>${entry.dispatch ? 
                    `<span class="badge bg-success">Dispatched</span>` :
                    `<span class="badge bg-warning">pending</span>`}
                </td>  
                <td>${formatDate(entry.date)}</td> 
                <td>  
                    <a href="#/edit-company-entry/${entry._id}"
                        class="btn btn-outline-warning btn-sm  "   
                    >
                        Edit
                    </a>
                    <button   class="btn btn-outline-danger btn-sm delete-company-entry-btn"
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
            </tr> `).join("");
    } else { 
        return rows = ` 
            <tr> 
                <td colspan="8"> 
                    ${state("Company Entry Not Found")} 
                </td> 
            </tr>` 
    }
}

export default async function companyEntryListPage() {
    try {
        const hash = window.location.hash;
        const query = hash.split("?")[1];
        const params = new URLSearchParams(query);

        const page = Number(params.get("page") || 1);
        const limit = 10;

        const q = params.get("q") || ""; 

        const app = document.getElementById("app");
        const response = await getCompanyEntries(page,limit,q); 
        const rows = createTableRow(response.companyEntries,emptyState)

        app.innerHTML = await layout(`
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        Company Entries
                    </h2>
    
                    <p class="text-secondary">
                        Manage all logs
                    </p> 
                </div>  
                <a
                    href="#/add-company-entry"
                    class="btn btn-outline-primary"
                >
                    Add Entry
                </a> 
            </div> 
           <div class="container-fluid mb-4">
                <form class="d-flex mb-2 search-bar" id="companyEntrySearchForm" role="search">
                    <input class="form-control me-2" id="companyEntrySearch" value="${q || ""}" type="search" placeholder="Search Entry" aria-label="Search"/>
                    <button class="btn btn-outline-success" id="companyEntrySearchBtn" type="submit">Search</button>
                </form> 
            </div>
            ${dataTable( 
                ["company" , "Product" , "Qty" , "Status" , "Date" , "Actions"] ,
                rows
            )}
            ${pagination(response.currentPage , response.totalPages)} 
        ` );

        await initializeLayoutEvents(); 
        initializePagination(
            function() { 
                window.location.hash = `#/company-entries?page=${page+1}&q=${q}`; 
            } , 
            function() {
                window.location.hash = `#/company-entries?page=${page-1}&q=${q}`; 
            }
        )

        const deleteBtns = document.querySelectorAll(".delete-company-entry-btn");
        deleteBtns.forEach((btn) => { 
            btn.addEventListener("click", async function (params) {
                try {
                    const id = this.dataset.entryId;
                    const deletedCompanyEntry = await deleteCompanyEntry(id);
                    if(deletedCompanyEntry) {
                        const row = this.closest("tr");
                        row.remove();
                        showToast(deletedCompanyEntry.message);
                    }
                }catch(err) {
                    console.log(err);
                    showToast(err.response?.data?.message, "error")
                }
            })
        })

        const form = document.getElementById("companyEntrySearchForm");
        const searchInput = document.getElementById("companyEntrySearch");
        form.addEventListener("submit" , function(e) {
            e.preventDefault();
            const q = searchInput.value;
            window.location.hash = `#/company-entries/search?page=1&q=${q}`
        }) 

        searchInput.addEventListener('input', function () {
            if (this.value === "") { 
                searchInput.value = ""; 
                window.location.hash = `#/company-entries?page=1`;
            }
        });
    }catch(err) {
        console.log(err);
        showToast(err.response?.data?.message, "error")
    }
    
}

