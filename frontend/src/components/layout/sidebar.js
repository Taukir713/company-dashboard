import getCurrUser from "../../utils/getCurrUser.js"; 

export default async function sidebar( ) {  
    const {user} = await getCurrUser();
    return `  
        <div class="sidebar" id="sidebar">

        <div class="sidebar-logo">
            Dashboard
        </div>

        <div class="sidebar-menu">

            <a href="#/dashboard">
                <i class="fa-solid fa-chart-line"></i>
                Dashboard
            </a>
            ${user?.role === "admin" ?
            `<a href="#/assemblers">
                <i class="fa-solid fa-screwdriver-wrench"></i>
                Assemblers
            </a>

            <a href="#/components">
                <i class="fa-solid fa-microchip"></i>
                Components
            </a>

            <a href="#/workers">
                <i class="fa-solid fa-users"></i>
                Workers
            </a>

            <a href="#/companies">
                <i class="fa-solid fa-building"></i>
                Companies
            </a>` : "" } 

            ${user?.role === "admin" || user?.role === "manager" ?
            `<a href="#/assembler-entries">
                <i class="fa-solid fa-gears"></i>
                Assembler Entries
            </a>
 
            <a href="#/worker-entries">
                <i class="fa-solid fa-clock"></i>
                Worker Entries
            </a>

            <a href="#/company-entries">
                <i class="fa-solid fa-boxes-stacked"></i>
                Company Entries
            </a>
            
             ` : "" }

            ${user?.role === "admin" ?
            `
            <a href="#/reports">
                <i class="fa-solid fa-chart-pie"></i>
                Reports
            </a>  
            <a href="#/users">
                <i class="fa-solid fa-user"></i>
                Users
            </a>`  : "" }
            
            <a href="#/settings">
                <i class="fa-solid fa-gear"></i>
                Settings
            </a> 
        </div>

    </div> 
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    `;
}

 