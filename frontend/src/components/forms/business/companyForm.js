export default function companyForm(company = null) { 
    return ` 
    <form id="companyForm" class="form-card"> 
        <div class="mb-4"> 
            <label class="form-label fw-semibold" for="companyName">
                Company Name
            </label>

            <input
                type="text"
                class="form-control mb-4"
                id="companyName"
                placeholder="Enter Company Name"
                value="${company?.name || ""}"
            >   
        </div>

        <button class="btn btn-outline-primary"> 
            ${company ? "Update Company" : "Add Company"} 
        </button> 
    </form> 
    `;
}