export default function componentForm(component = null) { 
    return ` 
    <form id="componentForm" class="form-card"> 
        <div class="mb-4"> 
            <label class="form-label fw-semibold" for="componentName">
                Component Name
            </label>

            <input
                type="text"
                class="form-control"
                id="componentName"
                placeholder="Enter Component Name"
                value="${component?.name || ""}"
            > 
        </div>

        <button class="btn btn-outline-primary"> 
            ${component ? "Update Component" : "Add Component"} 
        </button> 
    </form> 
    `;
}