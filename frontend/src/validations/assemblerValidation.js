export function validateAssembler(data) { 
    if (!data.name.trim()) { 
        return {valid: false,  message: "Assembler Name Required"};
    } 
    return {valid: true};
}

export function validateAssemblerEntry(data) {  
    if (!data.assemblerId || !data.componentId ||
        !data.typeId ||  !data.qty || data.date == "" ) { 
        return {valid: false, message: "All Fields Required"};
    }
    if (data.qty < 100) {
        return { valid: false, message: "Qty Must Be Greater Than 100" };
    } 
    return {valid: true  };
}

