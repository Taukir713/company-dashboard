export function validateWorker(data) {
    if (!data.name.trim() || !data.hourlyRate) {
        return { valid: false, message: "All Fields Required" };
    }

    if (data.hourlyRate <= 0) {
        return { valid: false, message: "Invalid Hourly Rate" };
    }

    return { valid: true };
}

export function validateWorkerEntry(data) { 
    if (!data.workerId || !data.workedHours || data.date == "" ) {
        return { valid: false, message: "All Fields Required" };
    }
    if (data.workedHours <= 0) {
        return { valid: false, message: "Hour must be Greater Than 0" };
    }
    return { valid: true };
}