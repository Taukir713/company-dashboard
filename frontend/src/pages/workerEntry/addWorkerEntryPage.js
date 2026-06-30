import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import {getWorkers} from "../../services/api/workforce/workerApi.js"
import {createWorkerEntry} from "../../services/api/workforce/workerEntryApi.js"
import workerEntryForm from "../../components/forms/workforce/workerEntryForm.js"
import {navigate} from "../../app/router.js";
import {showToast} from "../../utils/helper.js"
import { validateWorkerEntry } from "../../validations/workerValidation.js";

export default async function addWorkerEntryPage(params) {
    try {
        const app = document.getElementById("app");
        const response = await getWorkers(); 
        const workers = response.workers;

        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Add Worker Entry
                </h2>

                <p class="text-secondary">
                    Create worker entry
                </p> 
            </div>
            ${workerEntryForm(workers)}
        `);
        await initializeLayoutEvents();
        const form = document.getElementById("workerEntryForm");
        form.addEventListener("submit" , async function (e) {
            try {
                e.preventDefault();
                const data = {
                    workerId: document.getElementById("workerId").value,
                    workedHours: document.getElementById("workedHours").value,
                    date: document.getElementById("workerDate").value
                } 
                const {valid, message} = validateWorkerEntry(data)
                if(!valid) {
                    showToast(message, "error");
                    return;
                }
                const newWorkerEntry = await createWorkerEntry(data)
                if(newWorkerEntry) {
                    navigate("#/worker-entries" , true)
                    showToast(newWorkerEntry.message);
                }
            }catch(err) {
                showToast(err.response?.data?.message, "error");
            } 
        })
    } catch(err) {
        showToast(err.response?.data?.message, "error");
    } 
}