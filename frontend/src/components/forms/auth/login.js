export default function loginForm(count ) {
    return `<form id="loginForm"> 
        <div class="mb-4"> 
            <label class="form-label" for="username">
                Username
            </label>

            <input
                type="text"
                class="form-control"
                id="username"
                placeholder="Enter Username"
                value=""
            > 
        </div>

        <div class="mb-4"> 
            <label class="form-label" for="password">
                Password
            </label>

            <input
                type="password"
                class="form-control"
                id="password"
                placeholder="Enter Password"
                value=""
            > 
        </div>  
        <button class="btn btn-outline-primary w-100"> 
            Login 
        </button> 
    </form>`
}
 
 