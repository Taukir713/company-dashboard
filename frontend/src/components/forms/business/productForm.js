export default function productForm(product = null) { 
    return ` 
    <form id="productForm" class="form-card" > 
        <div class="mb-4"> 
            <label class="form-label fw-semibold" for="productName">
                Product Name
            </label>

            <input
                type="text"
                class="form-control mb-4"
                id="productName"
                placeholder="Enter Product Name"
                value="${product?.name || ""}"
            > 
            <label class="form-label fw-semibold" for="productPrice">
                Product price
            </label>

            <input
                type="text"
                class="form-control"
                id="productPrice"
                placeholder="Enter Product Price"
                value="${product?.price || ""}"
            > 
        </div> 
        <button class="btn btn-outline-primary"> 
            ${product ? "Update Product" : "Add Product"} 
        </button> 
    </form> 
    `;
}