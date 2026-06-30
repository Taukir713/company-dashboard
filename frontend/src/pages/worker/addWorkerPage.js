import layout , {initializeLayoutEvents}from "../../components/layout/layout.js";
import workerForm from "../../components/forms/workforce/workerForm.js"
import { createWorker } from "../../services/api/workforce/workerApi.js";
import { showToast } from "../../utils/helper.js";
import { navigate } from "../../app/router.js";
import { validateWorker } from "../../validations/workerValidation.js";

export default async function addWorkerPage(params) {
    const app = document.getElementById("app");
    app.innerHTML = await layout(`
        <div class="mb-4"> 
            <h2 class="fw-bold">
                Add Worker
            </h2>

            <p class="text-secondary">
                Create worker
            </p> 
        </div>
        ${workerForm()}
    `);

    await initializeLayoutEvents();
    const form = document.getElementById("workerForm");
    form.addEventListener("submit" , async function (e) {
        try {
            e.preventDefault();
            const name = document.getElementById("workerName").value;
            const hourlyRate = document.getElementById("workerRate").value;
            const {valid,  message} = validateWorker({name,hourlyRate});
            if(!valid) {
                showToast(message , "error");
                return;
            }
            const newWorker = await createWorker({name,hourlyRate});
            if(newWorker) {
                navigate("#/workers",true);
                showToast(newWorker.message);
            } 
        }catch(err){
            showToast(err.response?.data?.message , "error");
        }
    })
}