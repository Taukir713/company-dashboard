export function validateLogin(data) { 
    if (!data.username || !data.password) { 
        return {valid: false, message: "All Fields Required"   };
    } 
    return {valid: true  };
}

export function validateSignup(data) { 
    if (!data.username || !data.email || !data.password){ 
        return {valid: false,  message: "All Fields Required"};
    }

    if (data.password.length < 8) { 
        return {valid: false, message: "Password Must Be 8 Characters"};
    }

    return {valid: true};
}