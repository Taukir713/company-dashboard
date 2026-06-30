 export default function companyEntryForm(
    companies = [], 
    products = [],
    entry = null,
    date = ""
) { 
    return ` 
    <form id="companyEntryForm" class="form-card"> 
        <div class="row"> 
            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="companyId">
                    Select Company
                </label>

                <select class="form-select" id="companyId"> 
                    <option value="" selected disabled>
                        Select Company
                    </option> 
                    ${companies.map(company => `   
                        <option 
                            value="${company._id}"
                            ${entry?.companyId?._id === company._id ? "selected" : ""}
                        >
                            ${company.name}
                        </option> 
                    `).join("")} 
                </select> 
            </div>

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="productId">
                    Select Product
                </label>

                <select class="form-select" id="productId" > 
                    <option value="" selected disabled>
                        Select Product
                    </option>    
                    ${products.map(product => `
                        <option 
                            value="${product._id}"
                            ${entry?.productId?._id === product._id ? "selected" : ""}
                        >
                            ${product.name}
                        </option>  
                    `).join("")} 
                </select> 
            </div> 

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="companyQty">
                    Quantity
                </label>

                <input
                    type="number"
                    class="form-control"
                    id="companyQty"
                    placeholder="Enter Quantity"
                    value="${entry?.qty || ""}"
                > 
            </div>

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="companyDate">
                    Select Date
                </label>

                <input
                    type="date"
                    class="form-control"
                    id="companyDate" 
                    value="${date || ""}"
                > 
            </div>

            ${entry ? 
            `<div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="status">
                    Select Status
                </label>

                <select class="form-select" id="status"> 
                    <option value="" selected disabled>
                        Select Status
                    </option> 

                    <option value="true" ${entry?.dispatch ? "selected" : ""}>
                        Disptached
                    </option> 

                    <option value="false" ${!entry?.dispatch  ? "selected" : ""}>
                        Pending
                    </option>  

                </select> 
            </div>` : ""
            }

        </div> 

        <button class="btn btn-outline-primary"> 
            ${entry ? "Update Entry" : "Save Entry"} 
        </button> 
    </form> 
    `;
}