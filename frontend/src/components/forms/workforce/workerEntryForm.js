export default function workerEntryForm(  workers = [],entry = null ,date = "" ) {
    return ` 
    <form id="workerEntryForm" class="form-card"> 
        <div class="row"> 
            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold">
                    Select Worker
                </label> 
                <select class="form-select" id="workerId"> 
                    <option value="" selected disabled>
                        Select Worker
                    </option>

                    ${workers.map(worker => ` 
                        <option 
                            value="${worker._id}"
                            ${entry?.workerId._id === worker._id ? "selected" : ""}
                        >
                            ${worker.name}
                        </option> 
                    `).join("")} 
                </select> 
            </div>

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold">
                    Worked Hours
                </label>

                <input
                    type="number"
                    class="form-control"
                    id="workedHours"
                    placeholder="Enter Hours"
                    value="${entry?.workedHours || ""}"
                > 
            </div> 

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="workerDate">
                   Select Date
                </label>

                <input
                    type="date"
                    class="form-control"
                    id="workerDate" 
                    value="${date || ""}"
                > 
            </div> 
        </div>

        <button class="btn btn-outline-primary"> 
            ${entry ? "Update Entry" : "Save Entry"} 
        </button> 
    </form> 
    `;
}