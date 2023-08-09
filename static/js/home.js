// Sends POST request to server
function httpPost(url, body) {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    .then((res) => {
        if (res.redirected) {
            window.location.href = res.url
        }
        else {
            res.json()
        }
    })
    .then((data) => {})
    .catch(err => console.log(err))
}

// --------------------------- #
//          DOM Loaded         #
// --------------------------- #
document.addEventListener("DOMContentLoaded", () => {
    // --------------------------- #
    //            ADMIN            #
    // --------------------------- #
    // Send POST to check if user is admin.
    const admin_page_btn = document.getElementById("adminBtn")

    fetch("/home", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "cmd": "check_admin" })
    }).then((res) => {
        return res.json()
    }).then((data) => {
        if (data.msg == "isadmin") {
            admin_page_btn.hidden = false
        }
        else {
            admin_page_btn.hidden = true
        }
    }).catch(err => console.log(err))

    // Redirect to /admin.
    admin_page_btn.addEventListener("click", () => {
        window.location.href = "/admin"
    })

    // --------------------------- #
    //           DELETE            #
    //       FUNCTIONALITY         #
    // --------------------------- #
    const delete_btns = document.querySelectorAll(".delete-btn")

    delete_btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card")          
            const card_title = card.querySelector(".card-body").querySelector("h5").innerText
            
            // Post request
            httpPost("/home", { "cmd": "delete", "card_title": card_title })

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
            const card_title = card.querySelector(".card-body").querySelector("h5").innerText
            
            // Post request
            httpPost("/home", { "cmd": "confirm", "card_title": card_title })

            card.remove()
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
const main_container = document.getElementById("mainCont")
const add_new_card_temp = document.getElementById("addNewCardTemp")
const save_card_btn = document.getElementById("saveCardBtn")
const close_panel_btn = document.getElementById("closeCardBtn")
const card_body_input = document.getElementById("cardBodyInput")
const card_title_input = document.getElementById("cardTitleInput")

// Open new card panel
new_card_btn.addEventListener("click", () => {
    main_container.style.opacity = 0.5
    add_new_card_temp.style.display = "flex";
})

// Save card
save_card_btn.addEventListener("click", () => {
    let card_title = card_title_input.value
    let card_body = card_body_input.value

    // Post request
    httpPost("/home", { "cmd": "new_card", "card_title": card_title, "card_body":  card_body })

    main_container.style.opacity = 1
    add_new_card_temp.style.display = "none";
})

// Close add card panel
close_panel_btn.addEventListener("click", () => {
    main_container.style.opacity = 1
    add_new_card_temp.style.display = "none"
})