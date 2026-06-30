export default function forbiddenPage() {
    const app = document.getElementById("app");
    app.innerHTML = `  
        <div class="d-flex flex-column justify-content-center align-items-center vh-100"> 
            <h1 class="display-1 fw-bold">
                403
            </h1>

            <h3 class="mb-3">
                Access Denied
            </h3>

            <span class="mb-3">
                You Don't Have Permission To Access This Page. 
            </span>

            <a href="#/dashboard"  class="btn btn-outline-primary">
                Go Back
            </a>

        </div> 
    `
}