import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import assemblerEntryForm from "../../components/forms/assembly/assemblerEntryForm.js";
import {getAssemblers} from "../../services/api/assembly/assemblerApi.js";
import {getComponents} from "../../services/api/assembly/componentsApi.js"; 
import { createAssemblerEntry } from "../../services/api/assembly/assemblerEntryApi.js";
import {navigate} from "../../app/router.js"
import { showToast } from "../../utils/helper.js"; 
import {validateAssemblerEntry}  from "../../validations/assemblerValidation.js" 

export default async function addAssemblerEntryPage(params) {
    try {
        const app = document.getElementById("app");

        const assemblerResponse = await getAssemblers();
        const componentResponse = await getComponents(); 

        const assemblers = assemblerResponse.assemblers;
        const components = componentResponse.components;  
        
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Add Assembler Entry
                </h2>

                <p class="text-secondary">
                    Create assembler entry
                </p> 
            </div>
            ${assemblerEntryForm(assemblers,components)}
        `);
       await initializeLayoutEvents();

        const componentSelect = document.getElementById("componentId")
        const typeSelect = document.getElementById("typeId");

        componentSelect.addEventListener("change", function (params) {
            const selectedComponent = components.find((component) => component._id === this.value )
            typeSelect.innerHTML = "<option value='' selected disabled> Select Type </option>" 
            selectedComponent?.type.forEach((type) => {
                typeSelect.innerHTML += `
                    <option value="${type._id}">
                        ${type.name}
                    </option>
                `;
            }) 
        })

        const form = document.getElementById("assemblerEntryForm");
        form.addEventListener("submit" , async function (e) {
            try {
                e.preventDefault();
                const data = {
                    assemblerId: document.getElementById("assemblerId").value,
                    componentId: document.getElementById("componentId").value,
                    typeId: document.getElementById("typeId").value,
                    qty: document.getElementById("assemblerQty").value, 
                    date: document.getElementById("assemblerDate").value
                }      
                const {valid,message} = validateAssemblerEntry(data);
                if(!valid) {
                    showToast(message, "error");
                    return;
                }
                const newAssemblerEntry = await createAssemblerEntry(data)
                if(newAssemblerEntry) {
                    navigate("#/assembler-entries", true)
                    showToast(newAssemblerEntry.message)
                }
            } catch(err){
                showToast(err.response?.data?.message , "error")
            }
        })

    }catch(err){
        console.log(err)
        showToast(err.response?.data?.message , "error")
    }
    
}