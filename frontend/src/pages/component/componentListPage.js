import { getComponents , deleteComponent } from "../../services/api/assembly/componentsApi.js";
import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import dataTable from "../../components/ui/dataTable.js";
import { showToast , emptyState} from "../../utils/helper.js";

function createTableRow(arr,state) {
    let rows = [];
    if(arr.length) {
        return rows = arr.map((component) => `
            <tr> 
                <td>${component.name}</td>

                <td>${component.type.length}</td>
 
                <td>  
                    <a href="#/component-types/${component._id}"
                        class="btn btn-outline-primary btn-sm edit-component-btn" 
                    >
                        Types
                    </a>
                    <a href="#/edit-component/${component._id}"
                        class="btn btn-outline-warning btn-sm edit-component-btn" 
                    >
                        Edit
                    </a>

                    <button   class="btn btn-outline-danger btn-sm delete-component-btn"
                        data-id="${component._id}" 
                    >
                        Delete
                    </button> 
                </td>
            </tr>`
        ).join("") 
    } else { 
        return rows = ` 
            <tr> 
                <td colspan="3"> 
                    ${emptyState("No Component Found")} 
                </td> 
            </tr>` 
    }
}

export default  async function componentListPage(){
    try {
        const app = document.getElementById("app");
        const response = await getComponents() 
        const rows = createTableRow(response.components,emptyState)
        app.innerHTML = await layout(`
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        Components
                    </h2>

                    <p class="text-secondary">
                        Manage all components
                    </p> 
                </div>
                <a
                    href="#/add-component"
                    class="btn btn-outline-primary"
                >
                    Add Component
                </a> 
            </div> 
            ${dataTable(
                ["Component", "Types" , "Actions"],
                rows
            )}
        `)
        await initializeLayoutEvents();

        const deleteBtns = document.querySelectorAll(".delete-component-btn"); 
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click" , async function () { 
                try { 
                    const id = this.dataset.id;
                    const deletedComponent = await deleteComponent(id);
                    if(deletedComponent) {
                        const row  = this.closest("tr");
                        row.remove();
                        showToast(deletedComponent.message )
                    } 
                } catch(err) {
                    console.log(err)
                    showToast(err.response?.data?.message, "error");
                }  
            })
        })
    } catch(err) {
        showToast(err.response?.data?.message, "error")
    }    
}


