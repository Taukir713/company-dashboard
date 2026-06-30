import layout, {initializeLayoutEvents} from "../../components/layout/layout.js";
import { editAssembler,updateAssembler } from "../../services/api/assembly/assemblerApi.js";
import { showToast } from "../../utils/helper.js";
import assemblerForm from "../../components/forms/assembly/assemblerForm.js";
import { navigate } from "../../app/router.js";
import { validateAssembler } from "../../validations/assemblerValidation.js"; 

export default async function editAssemblerPage(id) {
    try {
        const app = document.getElementById("app");
        const response = await editAssembler(id);  
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Edit Assembler
                </h2>

                <p class="text-secondary">
                    Update assembler
                </p> 
            </div>

            ${assemblerForm(response.assembler)}

        `)
       await initializeLayoutEvents()
        

        const form = document.getElementById("assemblerForm");
        form.addEventListener("submit" , async(e) => {
            try {
                e.preventDefault();
                const id = response.assembler._id
                const name = document.getElementById("assemblerName").value 
                const {valid,message} = validateAssembler({name});
                if(!valid) {
                    showToast(message, "error");
                    return
                }
                const updatedAssembler = await updateAssembler(id,{name}); 
                navigate("#/assemblers",true);
                showToast(updatedAssembler.message);
            } catch(err) {  
                showToast(err.response?.data?.message, "error")
            }
        }) 
    } catch(err) {
        console.log(err)
        showToast(err.response?.data?.message, "error")
    }        
    
}