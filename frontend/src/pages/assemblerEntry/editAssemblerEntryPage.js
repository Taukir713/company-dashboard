import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import {editAssemblerEntry, updateAssemblerEntry} from "../../services/api/assembly/assemblerEntryApi.js";
import {getAssemblers} from "../../services/api/assembly/assemblerApi.js";
import {getComponents} from "../../services/api/assembly/componentsApi.js"; 
import assemblerEntryForm from "../../components/forms/assembly/assemblerEntryForm.js";
import {navigate} from "../../app/router.js";
import {formatDate, showToast} from "../../utils/helper.js"; 
import {validateAssemblerEntry} from "../../validations/assemblerValidation.js"

export default async function editAssemblerEntryPage(id,oldUrl) {
    try {
        const app = document.getElementById("app");
        const response = await editAssemblerEntry(id); 
        const assemblerResponse = await getAssemblers();
        const componentResponse = await getComponents();  

        const entry = response.assemblerEntry; 
        const assemblers = assemblerResponse.assemblers;
        const components = componentResponse.components;  

        const selectedComponent = components.find((component) => component._id === entry.componentId._id) 
        const types = selectedComponent.type;    
         
        const date = formatDate(entry.date)
        app.innerHTML = await layout(`
            ${assemblerEntryForm(assemblers,components ,types,entry ,date)}
        `);
       await initializeLayoutEvents();

        const componentSelect = document.getElementById("componentId")
        const typeSelect = document.getElementById("typeId");

        componentSelect.addEventListener("change", function (params) {
            const componentId = this.value; 
            const selectedComponent = components.find((component) => component._id === componentId)
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
        form.addEventListener("submit", async function (e) {
            try {
                e.preventDefault();
                const data = {
                    assemblerId: document.getElementById("assemblerId").value,
                    componentId: document.getElementById("componentId").value,
                    typeId: document.getElementById("typeId").value,
                    qty: document.getElementById("assemblerQty").value, 
                    retrieve: document.getElementById("retrieveStatus").value === "true", 
                    date: document.getElementById("assemblerDate").value
                }    
                const {valid,message} = validateAssemblerEntry(data);
                if(!valid) {
                    showToast(message, "error");
                    return;
                }
                const updatedAssemblerEntry = await updateAssemblerEntry(id,data); 
                if(updatedAssemblerEntry) {
                    const prevUrL = `#${oldUrl?.split("#")[1]}`; 
                    oldUrl ? navigate(prevUrL,true) : navigate("#/assembler-entries",true) 
                    showToast(updatedAssemblerEntry.message);
                }
            }catch(err) {
                console.log(err);
                showToast(err.response?.data?.message,"error")
            }
        })
    }catch(err) {
        console.log(err);
        showToast(err.response?.data?.message,"error")
    }
}