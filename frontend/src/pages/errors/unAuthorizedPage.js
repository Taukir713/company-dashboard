export default function unauthorizedPage() { 
    const app = document.getElementById("app"); 
    app.innerHTML = ` 
    <div class="d-flex flex-column justify-content-center align-items-center vh-100"> 
        <h1 class="display-2 fw-bold text-danger">
            401
        </h1>

        <h3 class="mb-3">
            Unauthorized Access
        </h3>

        <a
            href="#/dashboard"
            class="btn btn-outline-primary"
        >
            Dashboard
        </a> 
    </div> 
    `;
}