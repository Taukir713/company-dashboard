export default function typeForm(type = null) { 
    return ` 
    <form id="typeForm" class="form-card needs-validation" novalidate> 
        <div class="mb-4"> 
            <label class="form-label fw-semibold" for="typeName">
                Type Name
            </label>

            <input
                type="text"
                class="form-control mb-4"
                id="typeName"
                placeholder="Enter Type Name"
                value="${type?.name || ""}"
            > 
            <label class="form-label fw-semibold " for="typePrice">
                Type price
            </label>

            <input
                type="number"
                class="form-control"
                id="typePrice"
                placeholder="Enter Type Price"
                value="${type?.price || ""}"
            > 
        </div> 
        <button class="btn btn-outline-primary"> 
            ${type ? "Update Type" : "Add Type"} 
        </button> 
    </form> 
    `;
}