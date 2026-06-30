import layout, {initializeLayoutEvents} from "../../../components/layout/layout.js";
import { createCompanyProduct } from "../../../services/api/business/companyProductApi.js";
import productForm from "../../../components/forms/business/productForm.js"
import { showToast } from "../../../utils/helper.js";
import { navigate } from "../../../app/router.js";
import {validateProduct} from "../../../validations/companyValidation.js";

export default async function addProductPage(id) { 
        const app = document.getElementById("app");
        app.innerHTML = await layout(`
            <div class="mb-4"> 
                <h2 class="fw-bold">
                    Add Product
                </h2>

                <p class="text-secondary">
                    Create product
                </p> 
            </div>
            ${productForm()}
        `);
        await initializeLayoutEvents();
        const form = document.getElementById("productForm");
        form.addEventListener("submit" , async function (e) {
            try {
                e.preventDefault();
                const name = document.getElementById("productName").value;
                const price = document.getElementById("productPrice").value;
                const {valid , message} = validateProduct({name , price});
                if(!valid) {
                    showToast(message, "error");
                    return ;
                }
                const newProduct = await createCompanyProduct(id, {name,price});
                if(newProduct) {
                    navigate(`#/company-product/${id}`,true);
                    showToast(newProduct.message)
                }
            }catch(err) {
                console.log(err)
                showToast(err.response?.data?.message , "error")
            }
        })  
}