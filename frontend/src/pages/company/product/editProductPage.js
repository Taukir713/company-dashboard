import layout , {initializeLayoutEvents} from "../../../components/layout/layout.js";
import { editCompanyProduct, updateCompanyProduct } from "../../../services/api/business/companyProductApi.js";
import productForm from "../../../components/forms/business/productForm.js";
import { showToast } from "../../../utils/helper.js";
import { navigate } from "../../../app/router.js";
import {validateProduct} from "../../../validations/companyValidation.js";

export default async function editProductPage(id,prodId) {
    try{
        const app = document.getElementById("app");
        const response = await editCompanyProduct(id,prodId) 
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Edit ${response.company.name} Product
                </h2>

                <p class="text-secondary">
                    Update product
                </p> 
            </div>
            ${productForm(response.product)}
        `);
        await initializeLayoutEvents();
        const form = document.getElementById("productForm");
        form.addEventListener("submit", async function (e) {
            try {
                e.preventDefault();
                const name = document.getElementById("productName").value;
                const price = document.getElementById("productPrice").value;
                const {valid , message} = validateProduct({name , price});
                if(!valid) {
                    showToast(message, "error");
                    return ;
                }
                const updatedProduct = await updateCompanyProduct(id,prodId, {name,price});
                if(updatedProduct) {
                    navigate(`#/company-product/${id}`,true);
                    showToast(updatedProduct.message)
                }
            }catch(err) {
                console.log(err);
                showToast(err.response?.data?.message , "error")
            }
        })
    }catch(err) {
        console.log(err);
        showToast(err.response?.data?.message , "error")
    }
}