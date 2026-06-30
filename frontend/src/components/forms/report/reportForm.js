export default function reportForm(types=[],date,selectedType="") {
    return `
        <form id="reportForm" class="form-card mb-3"> 
        <div class="row">  
            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="reportDate">
                    Select Date
                </label>

                <input
                    type="month"
                    class="form-control"
                    id="reportDate" 
                    value="${date}"
                > 
            </div>

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="reportType">
                    Report Type
                </label>

                <select class="form-select" id="reportType" > 
                    <option   value="" selected disabled >
                        Select field
                    </option>  
                    ${types.map((type) => `
                         <option   value="${type}" ${type === selectedType ? "selected" : ""}    > 
                            ${type }
                        </option>
                    `)}
                </select> 
            </div> 
        </div> 

        <button class="btn btn-outline-primary"> 
            Generate Report
        </button> 

        ${selectedType ? 
            `<button class="btn btn-outline-warning" type="button" id="clearBtn"> 
                Clear
            </button>`
            : "" }
    </form> 
    `
}