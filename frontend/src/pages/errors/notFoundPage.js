export default function notFoundPage() {
    const app = document.getElementById("app");
    app.innerHTML = `  
        <div class="d-flex flex-column justify-content-center align-items-center vh-100"> 
            <h1 class="display-1 fw-bold">
                404
            </h1>

            <h3 class="mb-3">
                Page Not Found
            </h3>

            <a href="#/dashboard"  class="btn btn-outline-primary">
                Go Back
            </a>

        </div> 
    `
}