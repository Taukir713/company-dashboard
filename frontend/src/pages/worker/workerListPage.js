import layout, {initializeLayoutEvents} from "../../components/layout/layout.js";
import { getWorkers,deleteWorker } from "../../services/api/workforce/workerApi.js";
import dataTable from "../../components/ui/dataTable.js";
import { showToast,emptyState } from "../../utils/helper.js";
import { navigate } from "../../app/router.js";

function createTableRow(arr,state) {
    let rows = [];
    if(arr.length) {
        return rows = arr.map((worker) => `
            <tr> 
                <td>${worker.name}</td>
                <td>₹${worker.hourlyRate}/Hr</td>

                <td> 
                    <a href="#/edit-worker/${worker._id}"
                        class="btn btn-outline-warning btn-sm edit-worker-btn" 
                    >
                        Edit
                    </a>
                    <button   class="btn btn-outline-danger btn-sm delete-worker-btn"
                        data-id="${worker._id}" 
                    >
                        Delete
                    </button>   
                </td> 
            </tr>  
        `).join("")
    } else {
        return rows = `
            <tr> 
                <td colspan="3"> 
                    ${state("No Workers Found")} 
                </td> 
            </tr>`
    }
}

export default async function workerListPage(params) {
    try { 
        const app = document.getElementById("app");
        const response = await getWorkers(); 
        
        const rows = createTableRow(response.workers,emptyState)

        app.innerHTML = await layout(` 
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        Workers
                    </h2>

                    <p class="text-secondary">
                        Manage all workers
                    </p> 
                </div>
                <a
                    href="#/add-worker"
                    class="btn btn-outline-primary"
                >
                    Add Worker
                </a> 
            </div> 
            ${dataTable(
                ["Worker", "Rate", "Actions"],
                rows
            )} 
        `);
        await initializeLayoutEvents()

        const deleteBtns = document.querySelectorAll(".delete-worker-btn")
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click" , async function () { 
                try {
                    const id = this.dataset.id;
                    const deletedWorker = await deleteWorker(id);
                    if(deletedWorker) {
                        const row  = this.closest("tr");
                        row.remove();
                        showToast(deletedWorker.message); 
                    }
                } catch(err) { 
                    showToast(err.response?.data?.message, "error");
                } 
            })
        })
    }catch(err) { 
        showToast(err.response?.data?.message, "error");
    }       
}