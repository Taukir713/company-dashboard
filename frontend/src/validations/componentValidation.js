export function validateComponent(data) {
    if (!data.name.trim()) {
        return { valid: false, message: "Component Name Required" };
    }

    return { valid: true };
}

export function validateType(data) {
    if (!data.name.trim() || !data.price) {
        return { valid: false, message: "All Fields Required" };
    }
    if(data.price <= 0) {
        return{valid:false , message:"Price Must Be Greater Than 0"}
    }

    return { valid: true };
}