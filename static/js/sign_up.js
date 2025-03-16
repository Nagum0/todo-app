// Checks if input has an uppercase letter.
function hasUpperCase(input_text) {
    return /[A-Z]/.test(input_text)
}

// Checks if input has a lowercase letter.
function hasLowerCase(input_text) {
    return /[a-z]/.test(input_text)
}

// Checks if input has a digit.
function hasDigit(input_text) {
    return /[\d]/.test(input_text)
}

// Checks if input has a symbol.
function hasSymbol(input_text) {
    return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(input_text)
}

const username_sign_up_input = document.getElementById("usernameSignUpInput")
const email_input = document.getElementById("emailInput")
const password_sign_up_input = document.getElementById("passwordSignUpInput")
const confirm_password_sign_up_input = document.getElementById("confirmPasswordSignUpInput")
const sign_up_btn = document.getElementById("signUpBtn")
const login_btn = document.getElementById("loginBtn")
const error_msg_p = document.getElementById("errorMsgP")

/* Login page redirect */
login_btn.addEventListener("click", () => {
    window.location.href = "/login"
})

/* Sign up btn */
sign_up_btn.addEventListener("click", () => {
    // Checks if password and confirm passwords match.
    if (password_sign_up_input.value != confirm_password_sign_up_input.value) {
        error_msg_p.innerText = "Password and confirm passwords don't match."
    }
    else {
        // Checks password strength
        if (hasUpperCase(password_sign_up_input.value) 
        && hasLowerCase(password_sign_up_input.value) 
        && hasDigit(password_sign_up_input.value) 
        && hasSymbol(password_sign_up_input.value)) {

            let sign_up_data = {
                "username": username_sign_up_input.value,
                "email": email_input.value,
                "password": password_sign_up_input.value
            }

            // Post request
            fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sign_up_data)
            })
            .then((res) => {
                if (res.redirected) {
                    window.location.href = res.url
                }
                else {
                    return res.json()
                }
            })
            .then(data => {
                error_msg_p.innerText = data["msg"]
            })
            .catch(err => console.log("Error"))
        }
        else {
            error_msg_p.innerText = "Password is not strong enough.\nYou must have an uppercase letter, a lowercase letter\na number and a symbol!"
        }
    }
})
