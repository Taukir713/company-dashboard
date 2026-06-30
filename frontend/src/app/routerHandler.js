import editAssemblerPage from "../pages/assembler/editAssemblerPage.js"
import editComponentPage from "../pages/component/editComponentPage.js"
import componentTypesPage from "../pages/component/componentTypesPage.js"
import addTypePage from "../pages/component/addTypePage.js"
import editTypePage from "../pages/component/editTypePage.js"

import editWorkerPage from "../pages/worker/editWorkerPage.js"

import editCompanyPage from "../pages/company/editCompanyPage.js"
import companyProductPage from "../pages/company/product/companyProductPage.js"
import addProductPage from "../pages/company/product/addProductPage.js"
import editProductPage from "../pages/company/product/editProductPage.js"

import editAssemblerEntryPage from "../pages/assemblerEntry/editAssemblerEntryPage.js" 
import editWorkerEntryPage from "../pages/workerEntry/editWorkerEntryPage.js"
import editCompanyEntryPage from "../pages/companyEntry/editCompanyEntryPage.js"

import protectedRoute from "./protectedRoute.js"
import { adminRoute } from "./protectedRoute.js" 
import notFoundHandler from "./notFoundHandler.js"

import { isValidObjectId } from "../utils/helper.js"

export default function routerHandler(hash , oldurl ) {
    const id = hash.split("/")[2]   

    if(id && !isValidObjectId(id) && id !== "search") { 
        notFoundHandler()
        return
    }
    
    if(hash.startsWith("#/edit-assembler-entry")) {
        protectedRoute(() => editAssemblerEntryPage(id,oldurl));
        return true
    }
    
    if(hash.startsWith("#/edit-assembler")){
        adminRoute(() => (editAssemblerPage(id)))
        return true;
    }

    if(hash.startsWith("#/edit-component")) {
        adminRoute(() => editComponentPage(id));
        return true;
    }

    if(hash.startsWith("#/component-types")) {
        adminRoute(() => componentTypesPage(id));
        return true;
    }

    if(hash.startsWith("#/add-type")) {
        adminRoute(() => addTypePage(id));
        return true;
    }

    if(hash.startsWith("#/edit-type")) {
        let typeId = hash.split("/")[3]; 
        adminRoute(() => editTypePage(id,typeId));
        return true;
    }

    if(hash.startsWith("#/edit-worker-entry")) {
        protectedRoute(() => editWorkerEntryPage(id,oldurl));
        return true
    }

    if(hash.startsWith("#/edit-worker")) {
        adminRoute(() => editWorkerPage(id));
        return true;
    }

    if(hash.startsWith("#/edit-company-entry")) {
        protectedRoute(() => editCompanyEntryPage(id,oldurl));
        return true
    }

    if(hash.startsWith("#/edit-company")) {
        adminRoute(() => editCompanyPage(id));
        return true
    }

    if(hash.startsWith("#/company-product")) {
        adminRoute(() =>companyProductPage(id));
        return true
    }

    if(hash.startsWith("#/add-product")){
        adminRoute(() => addProductPage(id));
        return true
    }

    if(hash.startsWith("#/edit-product")) {
        let prodId  = hash.split("/")[3];
        adminRoute(() => editProductPage(id,prodId));
        return true
    } 
    
}

 