const getPagination = (page=1, limit=10) => {
    const skip = (page - 1) * limit; 
    return {skip}
}

module.exports = getPagination;