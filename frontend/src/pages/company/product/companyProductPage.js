import layout , {initializeLayoutEvents} from "../../../components/layout/layout.js";
import { getCompanyProducts , deleteCompanyProduct } from "../../../services/api/business/companyProductApi.js";
import { showToast , emptyState} from "../../../utils/helper.js";
import dataTable from "../../../components/ui/dataTable.js";
import getCurrUser from "../../../utils/getCurrUser.js"; 

function createTableRow(arr,state,compId) {
    let rows = []; 
    if(arr.length) {
        return rows = arr.map((product) => `
        <tr> 
            <td>${product.name}</td>  
            <td>₹${product.price}</td>  
            <td> 
                <a href="#/edit-product/${compId}/${product._id}"
                    class="btn btn-outline-warning btn-sm  "   
                >
                    Edit
                </a>
                <button   class="btn btn-outline-danger btn-sm delete-product-btn"
                    data-company-id="${compId}" 
                    data-product-id="${product._id}"
                >
                    Delete
                </button> 
            </td> 
            </tr> `).join("") 
        } else { 
            return rows = ` 
                <tr> 
                    <td colspan="3"> 
                        ${emptyState("No Products Found")} 
                    </td> 
                </tr>` 
        }
}

export default async function companyProductPage(id) {
    try {
        const app = document.getElementById("app");
        const response = await getCompanyProducts(id); 
        const compId = response.company._id
        const rows = createTableRow(response.product,emptyState,compId);
        
        app.innerHTML = await layout(`
            <div class="d-flex justify-content-between align-items-center mb-4"> 
                <div> 
                    <h2 class="fw-bold">
                       ${response.company.name} Products
                    </h2>
    
                    <p class="text-secondary">
                        Manage all products
                    </p> 
                </div> 
                <a
                    href="#/add-product/${response.company._id}"
                    class="btn btn-outline-primary"
                >
                    Add Product
                </a> 
            </div> 
            ${dataTable(
                ["Products" , "Price" , "Actions"],
                rows
            )}
        `);
        await initializeLayoutEvents();
        const deleteBtns = document.querySelectorAll(".delete-product-btn");
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click" , async function (params) {
                try {
                    const id = this.dataset.companyId;
                    const prodId = this.dataset.productId;
                    const deletedProduct = await deleteCompanyProduct(id,prodId);
                    if(deletedProduct) {
                        const row  = this.closest("tr");
                        row.remove();
                        showToast(deletedProduct.message )
                    }
                }catch(err) {
                    console.log(err)
                    showToast(err.response?.data?.message, "error")
                }
            })
        })
    }catch(err) {
        console.log(err)
        showToast(err.response?.data?.message, "error")
    }
    
}