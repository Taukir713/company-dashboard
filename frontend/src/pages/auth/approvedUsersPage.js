import layout , {initializeLayoutEvents} from "../../components/layout/layout.js"; 
import dataTable from "../../components/ui/dataTable.js";
import { getApprovedUsers ,updateUserRole} from "../../services/api/auth/authApi.js";
import { showToast ,emptyState  } from "../../utils/helper.js";

function createTableRow(arr,state) { 
    let rows = [];
    if(arr.length && arr.length > 1) {
        return rows  = arr.map((user) =>   {
            if(user.role === "admin") {
                return;
            } 
            return `<tr>  
                <td>${user.username}</td> 
                <td>${user.email}</td>  
                <td>${user.role}</td> 
                <td>
                ${user.role === "manager" ?
                    `<button   class="btn btn-outline-success btn-sm approveViewerBtn" 
                        data-user-id="${user._id}"  
                    >
                        Viewer
                    </button>`
                    : `<button   class="btn btn-outline-success btn-sm approveManagerBtn" 
                    data-user-id="${user._id}"  
                    >
                        Manager
                    </button>   ` }
                     
                </td> 
            </tr> `
        }).join("")
    }else {  
          return  rows = ` 
                <tr> 
                    <td colspan="9"> 
                       ${state("User List Not Found")} 
                    </td> 
                </tr>`  
        } 
}

export default async function approvedUsersPage() {
    try{
        const app = document.getElementById("app");
        const response = await getApprovedUsers();
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    All Users  
                </h2>

                <p class="text-secondary">
                    Manage all users
                </p> 
            </div>
            <a href="#/pending-users" class="btn btn-outline-primary mb-4"> 
                Pending Users
            </a>    
            ${dataTable(
                ["Username","Email", "Role","Actions"],
                createTableRow(response.users ,emptyState)
            )}
        `);
       await initializeLayoutEvents();

        const tbody = document.querySelector("tbody");
        tbody.addEventListener("click" , async function (e) {
            try {  
                if(e.target.classList.contains("approveManagerBtn")){  
                    const id = e.target.dataset.userId; 
                    const updatedUserRole = await updateUserRole(id,{role:"manager" ,status:"approved"}); 
                    if(updatedUserRole){
                        const row = e.target.closest("tr");   
                        row.children[2].textContent = "manager";
                        const btn = row.children[3].querySelector("button") 
                        btn.textContent = "Viewer" 
                        btn.classList.replace("approveManagerBtn","approveViewerBtn")  
                        showToast(updatedUserRole.message)
                    }      
                }
            } catch(err){
                console.log(err);
                showToast(err.response?.data?.message , "error")
            } 
        })

        tbody.addEventListener("click" , async function (e) {
            try {
                if(e.target.classList.contains("approveViewerBtn")){ 
                    const id = e.target.dataset.userId;
                    const updatedUserRole = await updateUserRole(id,{role:"viewer" ,status:"approved"});
                    if(updatedUserRole){ 
                        const row = e.target.closest("tr");  
                        row.children[2].textContent = "viewer"; 
                        const btn = row.children[3].querySelector("button")
                        btn.textContent = "Manager"
                        btn.classList.replace("approveViewerBtn", "approveManagerBtn")  
                        showToast(updatedUserRole.message)
                    } 
                }
            }  catch(err){
                console.log(err);
                showToast(err.response?.data?.message , "error")
            } 
            
        }) 
    }catch(err){
        console.log(err);
        showToast(err.response?.data?.message , "error")
    }
}