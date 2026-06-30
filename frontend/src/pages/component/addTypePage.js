import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import { createComponentType } from "../../services/api/assembly/componentTypeApi.js";
import typeForm from "../../components/forms/assembly/typeForm.js";
import { showToast } from "../../utils/helper.js";
import { navigate } from "../../app/router.js";
import {validateType} from "../../validations/componentValidation.js";

export default async function addTypePage(id) {
    const app = document.getElementById("app");
    app.innerHTML = await layout(`
        <div class="mb-4"> 
            <h2 class="fw-bold">
                Add Type
            </h2>

            <p class="text-secondary">
                Create Type
            </p> 
        </div>
        ${typeForm()}
    `)
    await initializeLayoutEvents()
    const form = document.getElementById("typeForm");
    form.addEventListener("submit" , async(e) => {
        try {
            e.preventDefault();
            const name = document.getElementById("typeName").value; 
            const price = document.getElementById("typePrice").value;
            const {valid, message} = validateType({name,price});
            if(!valid) {
                showToast(message, "error");
                return;
            }
            const newComponentType = await createComponentType(id, {name , price})
            if(newComponentType) {
                navigate(`#/component-types/${id}` , true)
                showToast(newComponentType.message); 
            } 
        }catch(err) {
            console.log(err.response);
            showToast(err.response?.data?.message , "error");
        }
    })
}