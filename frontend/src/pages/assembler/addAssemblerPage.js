import layout , {initializeLayoutEvents}from "../../components/layout/layout.js"
import {createAssembler} from "../../services/api/assembly/assemblerApi.js"
import assemblerForm from "../../components/forms/assembly/assemblerForm.js";
import { showToast } from "../../utils/helper.js";
import { navigate } from "../../app/router.js";
import { validateAssembler } from "../../validations/assemblerValidation.js"; 

export default async function addAssemblerPage() {
    try {
        const app = document.getElementById("app");
        app.innerHTML = await layout(` 
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Add Assembler
                </h2>

                <p class="text-secondary">
                    Create assembler
                </p> 
            </div>

            ${assemblerForm()}
        
        `);

       await initializeLayoutEvents ()

        const form = document.getElementById("assemblerForm"); 
        form.addEventListener("submit" , async(e) => {
            try {  
                e.preventDefault();
                const name = document.getElementById("assemblerName").value; 
                const {valid,message} = validateAssembler({name});
                if(!valid) {
                    showToast(message, "error");
                    return
                }
                const newAssembler =  await createAssembler({name}); 
                navigate("#/assemblers",true);
                showToast(newAssembler.message); 
            } catch(err) {
                showToast(err.response?.data?.message, "error")
            }
        })
    } catch(err) {
        console.log(err)
        showToast(err.response?.data?.message, "error")
    }
}