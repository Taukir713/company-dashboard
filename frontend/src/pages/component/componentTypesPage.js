import layout, {initializeLayoutEvents} from "../../components/layout/layout.js";   
import {getComponentTypes, deleteComponentType } from "../../services/api/assembly/componentTypeApi.js";
import dataTable from "../../components/ui/dataTable.js";
import { showToast , emptyState } from "../../utils/helper.js";
import {navigate} from "../../app/router.js"

function createTableRow(arr,state,compId) {
    let rows = [];
    if (arr.length) { 
        return rows = arr.map(type => ` 
            <tr> 
                <td>${type.name}</td> 
                <td>₹${type.price}</td> 
                <td> 
                    <a href="#/edit-type/${compId}/${type._id}"
                        class="btn btn-outline-warning btn-sm edit-type-btn" 
                    >
                        Edit
                    </a>
                    <button
                        class="btn btn-outline-danger btn-sm delete-type-btn"
                        data-component-id="${compId}"
                        data-type-id="${type._id}"
                    >
                        Delete
                    </button>  
                </td> 
            </tr> 
        `).join(""); 
    } else { 
        return rows = ` 
            <tr> 
                <td colspan="3"> 
                    ${emptyState("No Types Found")} 
                </td> 
            </tr> 
        `;
    }
}

export default async function componentTypesPage(id) {
    try {
        const app = document.getElementById("app"); 
        const response = await getComponentTypes(id); 
        const compId = response.component._id;
        const rows = createTableRow(response.types , emptyState, compId);
        
        app.innerHTML = await layout(` 
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        ${response.component.name} Types
                    </h2> 
                    <p class="text-secondary">
                        Manage component types
                    </p> 
                </div>  
                <a
                    href="#/add-type/${response.component._id}"
                    class="btn btn-outline-primary"
                >
                    Add Type
                </a> 
            </div>
    
            ${dataTable(
                ["Type", "Price", "Actions"],
                rows
            )} 
        `);
        
       await initializeLayoutEvents();

        const deleteBtns = document.querySelectorAll(".delete-type-btn");
        deleteBtns.forEach((btn)  => { 
            btn.addEventListener("click" , async function () {  
                try {
                    const id = this.dataset.componentId;
                    const typeId = this.dataset.typeId;
                    const deletedComponentType = await deleteComponentType(id,typeId);
                    if(deletedComponentType) {
                        const row  = this.closest("tr");
                        row.remove();
                        showToast(deletedComponentType.message);
                        navigate(`#/component-types/${id}`);
                    }
                }catch(err) { 
                    showToast(err.response?.data?.message, "error")
                }
            })
        })

    } catch(err) {
        console.log(err.response)
        showToast(err.response?.data?.message, "error")
    }
}