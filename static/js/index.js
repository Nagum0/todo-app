const login_btn = document.getElementById("loginBtn")
const sign_up_btn = document.getElementById("signUpBtn")

login_btn.addEventListener("click", () => {
    window.location.href = "/login"
})

sign_up_btn.addEventListener("click", () => {
    window.location.href = "/signup"
})