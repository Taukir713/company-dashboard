export default function assemblerForm(assembler = null) { 
    return ` 
    <form id="assemblerForm" class="form-card "  > 
        <div class="mb-4"> 
            <label class="form-label fw-semibold" for="assemblerName">
                Assembler Name
            </label>

            <input
                type="text"
                class="form-control"
                id="assemblerName"
                placeholder="Enter Assembler Name"
                value="${assembler?.name || ""}" 
                required
            > 
            <div class="invalid-feedback">
                required
            </div>
        </div>

        <button class="btn btn-outline-primary"> 
            ${assembler ? "Update Assembler" : "Add Assembler"} 
        </button> 
    </form> 
    `;
}