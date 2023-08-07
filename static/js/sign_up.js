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
    if (password_sign_up_input.value != confirm_password_sign_up_input.value) {
        error_msg_p.innerText = "Password was not confirmed."
    }
    else {
        let sign_up_data = {
            "username": username_sign_up_input.value,
            "email": email_input.value,
            "password": password_sign_up_input.value
        }

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
})