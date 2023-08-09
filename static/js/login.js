const login_btn = document.getElementById("loginBtn")
const sign_up_btn = document.getElementById("signUpBtn")

login_btn.addEventListener("click", () => {
    const username_input = document.getElementById("usernameInput").value
    const password_input = document.getElementById("passwordInput").value
    const error_msg_p = document.getElementById("errorMsgP")

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "user": username_input, "password": password_input })
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
    .catch(err => console.log("Error: " + err))
})

sign_up_btn.addEventListener("click", () => {
    window.location.href = "/signup"
})