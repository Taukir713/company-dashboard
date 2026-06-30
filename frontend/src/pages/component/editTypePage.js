import layout , {initializeLayoutEvents}from "../../components/layout/layout.js";
import { editComponentType , updateComponentType } from "../../services/api/assembly/componentTypeApi.js";
import typeForm from "../../components/forms/assembly/typeForm.js";
import {showToast} from "../../utils/helper.js"
import {navigate} from "../../app/router.js"
import {validateType} from "../../validations/componentValidation.js";

export default async function editTypePage(id,typeId) {
    try { 
        const app = document.getElementById("app");
        const response = await editComponentType(id,typeId); 
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Edit Type
                </h2>

                <p class="text-secondary">
                    Update Type
                </p> 
            </div>
            ${typeForm(response.type)}
        `)
        await initializeLayoutEvents();
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
                const updatedComponentType = await updateComponentType(id,typeId, {name,price})
                if(updatedComponentType) {
                    navigate(`#/component-types/${id}`,true);
                    showToast(updatedComponentType.message);
                }
            } catch(err) {
                showToast(err.response?.data?.message , "error");
            }
        })
    }catch(err) {
        console.log(err.response.data)
        showToast(err.response?.data?.message , "error")
    }
}