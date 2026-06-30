import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import dataTable from "../../components/ui/dataTable.js";
import {deleteWorkerEntry, getWorkerEntries} from "../../services/api/workforce/workerEntryApi.js";
import { formatDate, emptyState,showToast } from "../../utils/helper.js"; 
import getCurrUser from "../../utils/getCurrUser.js"; 
import {pagination , initializePagination} from "../../components/ui/pagination.js";

function creatTableRow(arr,state) {
    let rows = [];
    if(arr.length) {
        return rows = arr.map((entry) => `  
                <tr> 
                    <td>${entry.workerId?.name || "deleted worker"}</td>
                    <td>${entry.workedHours}Hrs</td>  
                    <td>${formatDate(entry.date)}</td>
                    <td> 
                        <a href="#/edit-worker-entry/${entry._id}"
                            class="btn btn-outline-warning btn-sm edit-worker-entry-btn" 
                        >
                            Edit
                        </a>
                        <button   class="btn btn-outline-danger btn-sm delete-worker-entry-btn"
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
                </tr>  
            `).join("")
    } else {
        return rows = `<tr> 
                    <td colspan="5"> 
                        ${emptyState("Worker Entry Not Found")} 
                    </td> 
                </tr>`
    } 
}

export default async function workerEntryListPage(params) {
    try{
        const hash = window.location.hash;
        const query = hash.split("?")[1];
        const params = new URLSearchParams(query);

        const page = Number(params.get("page") || 1);
        const limit = 10;  

        const q = params.get("q") || "";
        
        const app = document.getElementById("app");
        const response = await getWorkerEntries(page,limit,q);   
        const entries = response.workerEntries; 
        const rows = creatTableRow(entries,emptyState);
            
        app.innerHTML = await layout(`
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        Worker Entries
                    </h2>

                    <p class="text-secondary">
                        Manage all worker entries
                    </p> 
                </div> 

                <a
                    href="#/add-worker-entry"
                    class="btn btn-outline-primary"
                >
                    Add Entry
                </a> 
            </div> 
            <div class="container-fluid mb-2">
                <form class="d-flex mb-2 search-bar" role="search" id="workerEntrySearchForm">
                    <input class="form-control me-2" id="workerEntrySearch" value="${q || ""}" type="search" placeholder="Search Entry" aria-label="Search"/>
                    <button class="btn btn-outline-success" id="workerEntrySearchBtn" type="submit">Search</button>
                </form>
            </div>
            ${dataTable(
                [  "Worker","Hours","Date","Actions"] ,
                rows
            )}
            ${pagination(response.currentPage , response.totalPages)} 
        `);
        await initializeLayoutEvents();
        initializePagination(
            function() {
                window.location.hash = `#/worker-entries?page=${page+1}&q=${q}`; 
            } ,
            function() {
                window.location.hash = `#/worker-entries?page=${page-1}&q=${q}`;  
            }
        )
        const deleteBtns = document.querySelectorAll(".delete-worker-entry-btn");
        deleteBtns.forEach(btn => {
            btn.addEventListener("click" , async function (params) {
                try {
                    const id = this.dataset.entryId;
                    const deletedWorkerEntry = await deleteWorkerEntry(id);
                    if(deletedWorkerEntry) {
                        const row  = this.closest("tr");
                        row.remove(); 
                        showToast(deletedWorkerEntry.message)
                    }
                }catch(err) {
                    showToast(err.response?.data?.message , "error")
                } 
            })
        })

        const form = document.getElementById("workerEntrySearchForm");
        const searchInput = document.getElementById("workerEntrySearch");
        form.addEventListener("submit" , function(e) {
            e.preventDefault();
            const q = searchInput.value;
            window.location.hash = `#/worker-entries/search?page=1&q=${q}`
        })

        searchInput.addEventListener('input', function () {
            if (this.value === "") { 
                searchInput.value = ""; 
                window.location.hash = `#/company-entries?page=1`;
            }
        });
    }catch(err) { 
        showToast(err.response?.data?.message , "error")
    }
}

