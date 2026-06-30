import layout , {initializeLayoutEvents}from "../../components/layout/layout.js";
import analyticsCards from "../../components/ui/analyticsCards.js";

import {getAssemblers} from "../../services/api/assembly/assemblerApi.js";
import {getComponents} from "../../services/api/assembly/componentsApi.js";
import {getWorkers} from "../../services/api/workforce/workerApi.js";
import { getCompanies } from "../../services/api/business/companyApi.js"; 
import { showToast } from "../../utils/helper.js";

export default async function dashboardPage() {
    try {
        const app = document.getElementById("app");  

        const assemblers = await getAssemblers(); 
        const components = await getComponents();
        const workers = await getWorkers();
        const companies = await getCompanies(); 

        app.innerHTML = await layout(`
            <h1>Dashboard Analytics</h1> 
            <p>Overview of your system</p>

            ${analyticsCards({
                companies: companies.companies.length,
                workers: workers.workers.length,
                components: components.components.length,
                assemblers: assemblers.assemblers.length
            })}

            <div class="row mt-5 g-4"> 
                <div class="col-lg-8"> 
                    <div class="card-box"> 
                        <div class="d-flex justify-content-between mb-4"> 
                            <h5 class="fw-bold">
                                Analytics
                            </h5> 
                        </div> 
                        <canvas id="analyticsChart"></canvas> 
                    </div> 
                </div> 
                <div class="col-lg-4"> 
                    <div class="card-box"> 
                        <h5 class="fw-bold mb-4">
                            Quick Stats
                        </h5>

                        <div class="mb-4"> 
                            <h3>
                                ${assemblers.assemblers.length}
                            </h3> 
                            <p class="text-secondary">
                                Total Assemblers
                            </p> 
                        </div>

                        <div class="mb-4"> 
                            <h3>
                                ${components.components.length}
                            </h3> 
                            <p class="text-secondary">
                                Total Components
                            </p> 
                        </div> 

                        <div class="mb-4"> 
                            <h3>
                                ${workers.workers.length}
                            </h3> 
                            <p class="text-secondary">
                                Total Workers
                            </p> 
                        </div>

                        <div class="mb-4"> 
                            <h3>
                                ${companies.companies.length}
                            </h3> 
                            <p class="text-secondary">
                                Total Companies
                            </p> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        `);

        await initializeLayoutEvents()
                
        const ctx = document.getElementById('analyticsChart');
         
        new Chart(ctx , {
            type: "bar",
            data: {
                labels: ["assembler", "component", "workers", "companies" ],
                datasets: [{
                    label: "Dashboard Data",
                    data: [
                        assemblers.assemblers.length,
                        components.components.length,
                        workers.workers.length, 
                        companies.companies.length
                    ]
                }]
            }
        }) 
    } catch(err) {  
        showToast(err.reponse?.data?.message , "error")
    }        
    
}