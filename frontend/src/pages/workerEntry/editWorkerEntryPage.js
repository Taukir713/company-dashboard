import layout , {initializeLayoutEvents}from "../../components/layout/layout.js";
import {getWorkers} from "../../services/api/workforce/workerApi.js";
import {editWorkerEntry , updateWorkerEntry} from "../../services/api/workforce/workerEntryApi.js";
import workerEntryForm from "../../components/forms/workforce/workerEntryForm.js";
import { showToast ,formatDate } from "../../utils/helper.js";
import { navigate } from "../../app/router.js";
import { validateWorkerEntry } from "../../validations/workerValidation.js";

export default async function editWorkerEntryPage(id,oldUrl) {
    try {
        const app = document.getElementById("app");
        const workerResponse = await getWorkers();
        const WorkerEntryResponse = await editWorkerEntry(id); 

        const workers = workerResponse.workers;
        const entry = WorkerEntryResponse.workerEntry;
         
        const date = formatDate(entry.date)
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Edit Worker Entry
                </h2>

                <p class="text-secondary">
                    Update worker entry
                </p> 
            </div>
            ${workerEntryForm(workers , entry ,date)}
        `);
        await initializeLayoutEvents();
        const form = document.getElementById("workerEntryForm");
        form.addEventListener("submit", async function (e) {
            try {
                e.preventDefault();
                const data = {
                    workerId: document.getElementById("workerId").value,
                    workedHours: document.getElementById("workedHours").value,
                    date: document.getElementById("workerDate").value
                } 
                const {valid, message} = validateWorkerEntry( data)
                if(!valid) {
                    showToast(message, "error");
                    return;
                }
                const updatedWorkerEntry = await updateWorkerEntry(id,data)
                if(updatedWorkerEntry) {
                    const prevUrL = `#${oldUrl?.split("#")[1]}`;  
                    oldUrl ? navigate(prevUrL,true) : navigate("#/worker-entries",true)
                    showToast(updatedWorkerEntry.message);
                }
            }catch(err) {
                console.log(err)
                showToast(err.response?.data?.message, "error");
            } 
        })
    }catch(err) {
        console.log(err)
        showToast(err.response?.data?.message, "error");
    }
}

 