/**
 * Validate the auth form fields.
 * @param {string} username The username input field.
 * @param {string} email The email input field.
 * @param {string} password The password input field.
 * @returns {string|null} The error message if the form is not valid, otherwise null.
 */


export const loginFormValidator = (username: string, password: string) => {
    if (!username || !password) {
        return "All field are required";
    }
    if (!username) {
        return "Username is required";
    }
    if (!password) {
        return "Password is required";
    }
}
export const registerFormValidator = (username: string, email: string, password: string) => {
    if (!username || !email || !password) {
        return "All field are required";
    }
    if (!username) {
        return "Username is required";
    }
    if (!email) {
        return "Email is required";
    }
    if (!password) {
        return "Password is required";
    }

    //username validation
    if (username.length < 3) {
        return "Username must be at least 3 characters long";
    }
    if (username.length > 20) {
        return "Username must be at most 20 characters long";
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return "Username can only contain letters, numbers, and underscores";
    }

    //email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Invalid email format";
    }

    //password validation
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const numberRegex = /[0-9]/;
    const lengthRegex = /^.{6,}$/;

    if (!uppercaseRegex.test(password)) {
        return "Password must contain at least one uppercase letter";
    }
    if (!lowercaseRegex.test(password)) {
        return "Password must contain at least one lowercase letter";
    }
    if (!specialCharRegex.test(password)) {
        return "Password must contain at least one special character";
    }
    if (!numberRegex.test(password)) {
        return "Password must contain at least one number";
    }
    if (!lengthRegex.test(password)) {
        return "Password must be at least 6 characters long";
    }
    return null;
}