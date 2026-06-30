export function validateReport(data) {
    if(!data.date || !data.type) {
        return {valid: false , message:"All Field Required"}
    }
    return {valid: true}
}