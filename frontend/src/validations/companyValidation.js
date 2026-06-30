export function validateCompany(data) {
    if (!data.name.trim()) {
        return { valid: false, message: "Company Name Required" };
    }

    return { valid: true };
}

export function validateProduct(data) {
    if (!data.name.trim() || !data.price) {
        return { valid: false, message: "All Fields Required" };
    } 
    if (data.price <= 0) {
        return { valid: false, message: "Price Must Be Greater Than 0" };
    } 
    return { valid: true };
}

export function validateCompanyEntry(data) {  
    if (!data.companyId || !data.productId || !data.qty || data.date == ""  ) {
        return { valid: false, message: "All Feild Required" };
    }
    if (data.qty < 100) {
        return { valid: false, message: "Qty Must Be Greater Than 100" };
    } 
    return { valid: true };
}

 