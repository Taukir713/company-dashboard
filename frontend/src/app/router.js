import notFoundHandler from "./notFoundHandler.js";
const routes = {};

export function registerRoute(path,callback) {
    routes[path] = callback;
}

export function navigate(path,replaceState) {
    if(replaceState) {
        window.location.replace(path); 
    } 
    window.location.hash = path; 
}

export async function startRouter() {
    const hash = window.location.hash.split("?")[0];
    const route = routes[hash];
    if(route) {
        await route(); 
    }else {
        notFoundHandler()
    }
}
