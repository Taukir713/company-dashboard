export function emptyState(message = "No Data Found") {
    return `
        <div class="table-empty-state text-center py-5">
            <i class="fa-solid fa-box-open fs-1 text-secondary mb-3"></i>
            <h4>${message}</h4>
        </div> 
    `;
}

export function showToast(message, type="success") {
    const toast = document.createElement("div");

    toast.className = `
        position-fixed top-0 end-0 m-4 px-4 py-3 rounded shadow-lg text-white
        ${type === "success" ? "bg-success" : "bg-danger"}
    `;

    toast.style.zIndex = "99999";
    toast.innerText = message; 
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 1500);
}

export function formatDate(date) { 
    return new Date(date).toISOString().split("T")[0]
}

export function isValidObjectId(id) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}
 