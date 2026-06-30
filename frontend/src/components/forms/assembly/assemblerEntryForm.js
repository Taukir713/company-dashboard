import { formatDate } from "../../../utils/helper.js";
export default function assemblerEntryForm(
    assemblers = [],
    components = [],
    types = [],
    entry = null ,
    date = ""
    
    
    
) {
    return ` 
    <form id="assemblerEntryForm" class="form-card" > 
        <div class="row"> 
            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="assemblerId">
                    Select Assembler
                </label>

                <select class="form-select" id="assemblerId" > 
                    <option   value="" selected disabled >
                        Select Assembler
                    </option> 
                    ${assemblers.map(assembler => `   
                        <option 
                            value="${assembler._id}"
                            ${entry?.assemblerId?._id === assembler._id ? "selected" : ""}
                        >
                            ${assembler.name}
                        </option> 
                    `).join("")} 
                </select> 
            </div>

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="componentId">
                    Select Component
                </label>

                <select class="form-select" id="componentId"> 
                    <option  value="" selected disabled >
                        Select Component
                    </option>

                    ${components.map(component => ` 
                        <option 
                            value="${component._id}"
                            ${entry?.componentId._id === component._id ? "selected" : ""}
                        >
                            ${component.name}
                        </option> 
                    `).join("")} 
                </select> 
            </div>

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="typeId">
                    Select Type
                </label>

                <select class="form-select" id="typeId" > 
                    <option  value="" selected disabled >
                        Select Type
                    </option>   
                    ${types.map(type => `
                        <option 
                            value="${type._id}"
                            ${entry?.typeId?._id === type._id ? "selected" : ""}
                        >
                            ${type.name}
                        </option>  
                    `).join("")} 
                </select> 
            </div> 

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="assemblerQty">
                    Quantity
                </label>

                <input
                    type="number"
                    class="form-control"
                    id="assemblerQty"
                    placeholder="Enter Quantity"
                    value="${entry?.qty || ""}"
                > 
            </div>

            <div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="assemblerDate">
                    Select Date
                </label>

                <input
                    type="date"
                    class="form-control"
                    id="assemblerDate" 
                    value="${date || ""}"
                > 
            </div>

            <div class="col-lg-6 mb-4"> 
                <label  class="form-check-label  fw-semibold" for="checkChecked" for="assemblerDate">
                    Add Today's Date
                </label>

                <div class="form-check checkbox">
                    <input class="form-check-input" type="checkbox" value="" id="checkChecked" checked>
                </div>
            </div>

            ${entry ? 
            `<div class="col-lg-6 mb-4"> 
                <label class="form-label fw-semibold" for="retrieveStatus">
                    Select Status
                </label>

                <select class="form-select" id="retrieveStatus"> 
                    <option selected disabled >
                        Select Status
                    </option> 

                    <option value="true" ${entry?.retrieve ? "selected" : ""}>
                        Retrieved
                    </option> 

                    <option value="false" ${!entry?.retrieve  ? "selected" : ""}>
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