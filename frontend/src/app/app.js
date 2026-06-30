import { registerRoute , startRouter } from "./router.js";
import validRoutes from "../config/validRoute.js";

import dashboardPage from "../pages/dashboard/dashboardPage.js";
import assemblerListPage from "../pages/assembler/assemblerListPage.js";
import addAssemblerPage from "../pages/assembler/addAssemblerPage.js";

import componentListPage from "../pages/component/componentListPage.js";
import addComponentPage from "../pages/component/addComponentPage.js";

import workerListPage from "../pages/worker/workerListPage.js";
import addWorkerPage from "../pages/worker/addWorkerPage.js";

import companyListPage from "../pages/company/companyListPage.js";
import addCompanyPage from "../pages/company/addCompanyPage.js";

import assemblerEntryListPage from "../pages/assemblerEntry/assemblerEntryListPage.js";
import addAssemblerEntryPage from "../pages/assemblerEntry/addAssemblerEntryPage.js";

import workerEntryListPage from "../pages/workerEntry/workerEntryListPage.js";
import addWorkerEntryPage from "../pages/workerEntry/addWorkerEntryPage.js";

import companyEntryListPage from "../pages/companyEntry/companyEntryListPage.js";
import addComponentEntryPage from "../pages/companyEntry/addCompanyEntryPage.js";

import reportsPage from "../pages/reports/reportsPage.js";

import approvedUsersPage from "../pages/auth/approvedUsersPage.js";
import pendingUserPage from "../pages/auth/pendingUserPage.js";

import LoginPage from "../pages/auth/loginPage.js";
import signupPage from "../pages/auth/signupPage.js";
import settingsPage from "../pages/settings/settingsPage.js";

import routerHandler from "./routerHandler.js"; 
import notFoundHandler from "./notFoundHandler.js"  

import protectedRoute from "../app/protectedRoute.js";   
import {adminRoute ,authenticatedRoute} from "../app/protectedRoute.js";   
 
registerRoute("#/dashboard" , () => authenticatedRoute(dashboardPage)) 

registerRoute("#/assemblers", () => adminRoute(assemblerListPage)) 
registerRoute("#/add-assembler", () =>  adminRoute(addAssemblerPage))

registerRoute("#/components", () => adminRoute(componentListPage) )
registerRoute("#/add-component", () => adminRoute(addComponentPage) )

registerRoute("#/workers", () => adminRoute(workerListPage))
registerRoute("#/add-worker", () => adminRoute(addWorkerPage))

registerRoute("#/companies", () => adminRoute(companyListPage))
registerRoute("#/add-company", () => adminRoute(addCompanyPage))

registerRoute("#/assembler-entries", () => protectedRoute(assemblerEntryListPage))
registerRoute("#/assembler-entries/search", () => protectedRoute(assemblerEntryListPage))
registerRoute("#/add-assembler-entry", () => protectedRoute(addAssemblerEntryPage))

registerRoute("#/worker-entries", () => protectedRoute(workerEntryListPage))
registerRoute("#/worker-entries/search", () => protectedRoute(workerEntryListPage))
registerRoute("#/add-worker-entry", () => protectedRoute(addWorkerEntryPage))

registerRoute("#/company-entries", () => protectedRoute(companyEntryListPage))
registerRoute("#/company-entries/search", () => protectedRoute(companyEntryListPage))
registerRoute("#/add-company-entry", () => protectedRoute(addComponentEntryPage))

registerRoute("#/reports",() => adminRoute(reportsPage) )

registerRoute("#/pending-users",() => adminRoute(pendingUserPage) ) 
registerRoute("#/users" , () => adminRoute(approvedUsersPage))

registerRoute("#/login", LoginPage)
registerRoute("#/signup", signupPage) 

registerRoute("#/settings" , () => authenticatedRoute(settingsPage))

window.addEventListener("load" , async function (e) {
    const hash = window.location.hash.split("?")[0]; 
    if(!hash) {
        window.location.hash = "#/dashboard"; 
    }
    const handled = routerHandler(hash);
    if(!handled) {
       await startRouter()
    }
})

window.addEventListener("hashchange" , async function (e) { 
    const oldUrl = e.oldURL;
    const hash = window.location.hash.split("?")[0]; 
    const handled = routerHandler(hash,oldUrl); 
    if(!handled) {
        await startRouter()  
    } 
})

 