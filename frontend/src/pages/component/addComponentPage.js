import componentForm from "../../components/forms/assembly/componentForm.js";
import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import { createComponent } from "../../services/api/assembly/componentsApi.js";
import { showToast } from "../../utils/helper.js";
import { navigate } from "../../app/router.js";
import  {validateComponent} from "../../validations/componentValidation.js";

export default async function addComponentPage() {
    const app = document.getElementById("app");
    app.innerHTML = await layout(`
        <div class="mb-4"> 
            <h2 class="fw-bold">
                Add Component
            </h2>

            <p class="text-secondary">
                Create Component
            </p> 
        </div>
        ${componentForm()}
    `)
    await initializeLayoutEvents();

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
            const newComponent = await createComponent({name});
            if(newComponent) {
                navigate("#/components",true); 
                showToast(newComponent.message);
            }
        } catch(err) {
            showToast(err.response?.data?.message , "error" )
        } 
    })

}