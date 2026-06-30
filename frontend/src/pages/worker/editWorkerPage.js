import layout, {initializeLayoutEvents} from "../../components/layout/layout.js";
import { editWorker , updateWorker } from "../../services/api/workforce/workerApi.js";
import workerForm from "../../components/forms/workforce/workerForm.js";
import { showToast } from "../../utils/helper.js";
import { navigate } from "../../app/router.js";
import { validateWorker } from "../../validations/workerValidation.js";

export default async function editWorkerPage(id) {
    try {
        const response = await editWorker(id); 
        const app = document.getElementById("app");
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Edit Worker
                </h2>
    
                <p class="text-secondary">
                    Update worker
                </p> 
            </div>
            ${workerForm(response.worker)}
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
                const updatedWorker = await updateWorker(id , {name,hourlyRate});
                if(updatedWorker) {
                    navigate("#/workers",true)
                    showToast(updatedWorker.message);
                }
            }catch(err) {
                showToast(err.response?.data?.message, "error")
            } 
        })

    }catch(err) {
        console.log(err)
        showToast(err.response?.data?.message, "error")
    }
}