import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import { editComponent , updateComponent } from "../../services/api/assembly/componentsApi.js";
import componentForm from "../../components/forms/assembly/componentForm.js";
import { showToast } from "../../utils/helper.js";
import { navigate } from "../../app/router.js";
import  {validateComponent} from "../../validations/componentValidation.js";

export default async function editComponentPage(id) {
    try {
        const app = document.getElementById("app");
        const response = await editComponent(id);
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Edit Component
                </h2>

                <p class="text-secondary">
                    Update Component
                </p> 
            </div>
            ${componentForm(response.component)}
        `);
        await initializeLayoutEvents()

        const form = document.getElementById("componentForm");
        form.addEventListener("submit" , async(e) => {
            try {
                e.preventDefault();
                const name = document.getElementById("componentName").value; 
                const {valid , message} = validateComponent({name})
                if(!valid) {
                    showToast(message, "error");
                    return;
                }
                const updatedComponent = await updateComponent(id,{name}) 
                if(updatedComponent) {
                    navigate("#/components",true); 
                    showToast(updatedComponent.message);
                }
            } catch(err) {
                showToast(err.response?.data?.message, "error")
            }
        })
    } catch(err) {
        showToast(err.response?.data?.message, "error")
    }        
}