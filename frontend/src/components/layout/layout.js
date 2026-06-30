import sidebar from "./sidebar.js";
import navbar , { navbarEvents} from "./navbar.js";
 
export default async function layout(content) {
    return `
        ${await sidebar( )}

        <div class="main-wrapper">
        
            ${await navbar()}
    
            <div class="page-content">
    
                ${content}
    
            </div>
        
        </div>
    `
}

export async function initializeLayoutEvents() {

   await navbarEvents();
}