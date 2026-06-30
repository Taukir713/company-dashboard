export function pagination(currentPage=1 , totalPages = 1 ) {
    return `
    <div class="d-flex justify-content-between align-items-center mt-3"> 
        <div> 
            <span class="fw-semibold"> 
                Page ${currentPage} of ${totalPages} 
            </span> 
        </div>

        <div class="d-flex gap-2"> 
            <button
                class="btn btn-outline-primary"
                id="prevPageBtn"
                ${currentPage <= 1
                    ? "disabled"
                    : ""
                }
            > 
                Previous 
            </button>
            <button
                class="btn btn-outline-primary"
                id="nextPageBtn"
                ${currentPage >= totalPages
                    ? "disabled"
                    : ""
                }
            > 
                Next 
            </button> 
        </div> 
    </div> 
    `
} 

export function initializePagination(onNext, onPrev) { 
    const prevBtn = document.getElementById("prevPageBtn"); 
    const nextBtn = document.getElementById("nextPageBtn");
 
    prevBtn.addEventListener( "click",function () { 
        onPrev(); 
    }); 

    nextBtn.addEventListener( "click",function () { 
        onNext(); 
    });   
}