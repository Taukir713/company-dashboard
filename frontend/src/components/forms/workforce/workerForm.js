export default function workerForm(worker = null) { 
    return ` 
    <form id="workerForm" class="form-card needs-validation " novalidate> 
        <div class="mb-4"> 
            <label class="form-label fw-semibold" for="workerName">
                Worker Name
            </label>

            <input
                type="text"
                class="form-control mb-4"
                id="workerName"
                placeholder="Enter Worker Name"
                value="${worker?.name || ""}"
            > 

            <label class="form-label fw-semibold" for="workerRate">
                Rate
            </label>

            <input
                type="number"
                class="form-control"
                id="workerRate"
                placeholder="Enter Hourly Rate"
                value="${worker?.hourlyRate || ""}"
            > 

        </div>

        <button class="btn btn-outline-primary"> 
            ${worker ? "Update Worker" : "Add Worker"} 
        </button> 
    </form> 
    `;
}