import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import { getPendingUsers ,updateUserRole } from "../../services/api/auth/authApi.js";
import dataTable from "../../components/ui/dataTable.js";
import { showToast ,emptyState  } from "../../utils/helper.js";

function createTableRow(arr,state) { 
    let rows = [];
    if(arr.length) {
        return rows  = arr.map((user) =>`
             <tr>  
                <td>${user.username}</td> 
                <td>${user.email}</td>   
                <td>
                    <button   class="btn btn-outline-primary btn-sm approveManagerBtn" 
                        data-user-id="${user._id}"  
                    >
                        Manager
                    </button> 
                    <button   class="btn btn-outline-secondary btn-sm approveViewerBtn" 
                        data-user-id="${user._id}"  
                    >
                        Viewer
                    </button> 
                     
                    <button   class="btn btn-outline-danger btn-sm rejectReqBtn"  
                        data-user-id="${user._id}"  
                    >
                        Reject
                    </button>  
                </td>
            </tr> 
        `).join("")
    }else {  
          return  rows = ` 
                <tr> 
                    <td colspan="9"> 
                       ${state("User Request Not Found")} 
                    </td> 
                </tr>`  
        } 
}

export default async function pendingUserPage(params) {
    try { 
        const app = document.getElementById("app");
        const response = await getPendingUsers();  
        const rows = createTableRow(response.pendingUsers ,emptyState)
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Pending Requests
                </h2>

                <p class="text-secondary">
                    Manage all requests
                </p> 
            </div>
            ${dataTable(
                ["Username","Email","Actions"],
                rows
            )}
        ` );
       await initializeLayoutEvents();

        const approveManagerBtn = document.querySelectorAll(".approveManagerBtn");
        approveManagerBtn.forEach((btn) => { 
            if(btn) {
                btn.addEventListener("click" , async function ( ) {
                    try {
                        const id = this.dataset.userId; 
                        const updatedUser = await updateUserRole(id,{role:"manager" ,status:"approved"});
                        console.log(updatedUser , "ok")
                        if(updatedUser) {
                            const row = this.closest("tr");
                            row.remove();
                            showToast(updatedUser.message)
                        }
                    }catch(err) {
                        console.log(err)
                        showToast(err.response?.data?.message)
                    }
                })
            }
        })

        const approveViewerBtn = document.querySelectorAll(".approveViewerBtn");
        approveViewerBtn.forEach((btn) => { 
            if(btn) { 
                btn.addEventListener("click" , async function ( ) {
                    try {
                        const id = this.dataset.userId; 
                        const updatedUser = await updateUserRole(id,{role:"viewer" ,status:"approved"});
                        console.log(updatedUser  )
                        if(updatedUser) {
                            const row = this.closest("tr");
                            row.remove();
                            showToast(updatedUser.message)
                        }
                    }catch(err) {
                        console.log(err)
                        showToast(err.response?.data?.message)
                    }
                })
            }
        })

        const rejectReqBtn = document.querySelectorAll(".rejectReqBtn");
        rejectReqBtn.forEach((btn) => { 
            if(btn) { 
                btn.addEventListener("click" , async function ( ) {
                    try {
                        const id = this.dataset.userId; 
                        const updatedUser = await updateUserRole(id,{ status:"rejected"}); 
                        if(updatedUser) {
                            const row = this.closest("tr");
                            row.remove();
                            showToast(updatedUser.message)
                        }
                    }catch(err) {
                        console.log(err)
                        showToast(err.response?.data?.message)
                    }
                })
            }
        })
    }catch(err) {
        console.log(err)
        showToast(err.response?.data?.message)
    }
}