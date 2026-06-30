import layout , {initializeLayoutEvents} from "../../components/layout/layout.js";
import { getReports } from "../../services/api/report/reportApi.js";
import dataTable from "../../components/ui/dataTable.js";
import { emptyState, showToast } from "../../utils/helper.js";
import reportForm from "../../components/forms/report/reportForm.js";
import { validateReport } from "../../validations/reportValidation.js";

function creatTableRow(arr,state,date) { 
    let rows = [];
    if(arr.length) {
        return rows = arr.map((entry) => `   
                <tr> 
                    <td>${entry.assembler?.[0].name || entry.worker?.[0].name || entry.company?.[0].name}</td>
                    <td>₹${entry.totalAmount}</td>  
                    <td>${date}</td>  
                </tr>  
            `).join("")
    } else {
        return rows = `<tr> 
                    <td colspan="3"> 
                        ${emptyState("Coudn't Find Report")} 
                    </td> 
                </tr>`
    } 
}

export default async function reportsPage(params) {
    try {
        const hash = window.location.hash;
        const query = hash.split("?")[1]
        const params = new URLSearchParams(query);
        let type = params.get("type")  ;
        let month = Number(params.get("month")) ;
        let year = Number(params.get("year"))  ;   

        let selectedDate = ""; 
        if (month && year) {
            selectedDate = `${year}-${String(month).padStart(2, "0")}`;
        }
        
        const app = document.getElementById("app"); 
        const response = await getReports(type,month,year);

        const rows = creatTableRow(response.reports,emptyState,selectedDate)
        app.innerHTML = await layout(`
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                        Monthly Reports
                    </h2>

                    <p class="text-secondary">
                        Generate business reports
                    </p> 
                </div>  
            </div> 
            <div>
                ${reportForm(["assembler" , "worker" , "company"] , selectedDate,type)}
            </div>
            ${dataTable(
                ["Name" , "Amount" , "Date" ] ,
                rows
            )}
        `);
        await initializeLayoutEvents()
        const form = document.getElementById("reportForm");
        form.addEventListener("submit" , async function (e) {
            e.preventDefault()
            try {
                const date = document.getElementById("reportDate").value;
                const type = document.getElementById("reportType").value; 
                const {valid,message} = validateReport({date,type})
                if(!valid) {
                    showToast(message , "error");
                    return
                }
                const month = date.split("-")[1];
                const year = date.split("-")[0]
                window.location.hash = `#/reports?type=${type}&month=${month}&year=${year}`  
            } catch(err) { 
                showToast(err.response?.data?.message, "error")
            } 
        })
        const clearBtn = document.getElementById("clearBtn");
        if(clearBtn) {
            clearBtn.addEventListener("click" , function() { 
                window.location.hash = `#/reports`  
            })
        } 
    }catch(err) {
        console.log(err);
        showToast(err.response?.data?.message, "error")
    }
} 