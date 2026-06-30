export default function signupForm(){
    return `
        <form id="signupForm"> 
            <div class="mb-3"> 
                <label class="form-label" for="signupUsername">
                    Username
                </label>

                <input
                    type="text"
                    class="form-control"
                    id="signupUsername"
                    placeholder="Enter username"
                    value=""
                > 
            </div>

            <div class="mb-3"> 
                <label class="form-label" for="signupEmail">
                    Email
                </label>

                <input
                    type="email"
                    class="form-control"
                    id="signupEmail"
                    placeholder="Enter Email"
                    value=""
                > 
            </div>

            <div class="mb-4"> 
                <label class="form-label" for="signupEmail">
                    Password
                </label>

                <input
                    type="password"
                    class="form-control"
                    id="signupPassword"
                    placeholder="Enter Password"
                    value=""
                > 
            </div>

            <button class="btn btn-outline-primary w-100"> 
                Signup 
            </button> 
        </form>
    `
}