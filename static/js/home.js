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
            
            // BACKEND           
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
    //         COMPLETED           #
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
            .then((res) => res.json())
            .then((data) => {
                card.remove()
            })
            .catch(err => console.log(err))
        })
    })
})

// --------------------------- #
//           NAVBAR            #
// --------------------------- #
const logout_btn = document.getElementById("logoutBtn")

logout_btn.addEventListener("click", () => {
    window.location.href = "/logout"
})

// --------------------------- #
//          COMPLETED          #
// --------------------------- #
const complete_btn = document.getElementById("completedBtn")

complete_btn.addEventListener("click", () => {
    window.location.href = "/completed"
})

// --------------------------- #
//          NEW CARD           #
// --------------------------- #
const new_card_btn = document.getElementById("newCardBtn")

new_card_btn.addEventListener("click", () => {
    // FRONTEND
    const main_container = document.getElementById("mainCont")
    const add_new_card_temp = document.getElementById("addNewCardTemp")
    main_container.style.opacity = 0.5
    add_new_card_temp.style.display = "flex";


    // BACKEND
})