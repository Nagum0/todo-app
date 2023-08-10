// Home
const home_btn = document.getElementById("homeBtn")

home_btn.addEventListener("click", () => {
    window.location.href = "/home"
})

// Completed
const complete_btn = document.getElementById("completedBtn")

complete_btn.addEventListener("click", () => {
    window.location.href = "/completed"
})

// Logout
const logout_btn = document.getElementById("logoutBtn")

logout_btn.addEventListener("click", () => {
    window.location.href = "/logout"
})