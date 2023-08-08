// --------------------------- #
//          DOM Loaded         #
// --------------------------- #
document.addEventListener("DOMContentLoaded", () => {

    // --------------------------- #
    //           DELETE            #
    //       FUNCTIONALITY         #
    // --------------------------- #
    const delete_btns = document.querySelectorAll(".delete-btn")

    delete_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card")
            
            // --------------------------- #
            //           BACKEND           #
            // --------------------------- #
            const card_title = card.querySelector(".card-body").querySelector("h5").innerText
            
            let msg_data = { "cmd": "delete", "card_title": card_title }

            fetch("/home", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(msg_data)
            })
            .then((res) => {
                return res.json()
            })
            .catch(err => console.log(err))

            // Remove the card
            card.remove()
        })
    })

    // --------------------------- #
    //          CONFIRM            #
    //       FUNCTIONALITY         #
    // --------------------------- #
    const confirm_btns = document.querySelectorAll(".confirm-btn")

    confirm_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card")

            // --------------------------- #
            //           BACKEND           #
            // --------------------------- #
            const card_title = card.querySelector(".card-body").querySelector("h5").innerText
            
            let msg_data = { "cmd": "confirm", "card_title": card_title }

            fetch("/home", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(msg_data)
            })
        })
    })
})

/* Navbar */
const logout_btn = document.getElementById("logoutBtn")

logout_btn.addEventListener("click", () => {
    window.location.href = "/logout"
})

