// --------------------------- #
//           NAVBAR            #
// --------------------------- #
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

// --------------------------- #
//            MAIN             #
// --------------------------- #

// Functions
function createOutput(text) {
    const sql_output = document.getElementById("sqlOutput")

    const output_msg = document.createElement("p")
    output_msg.innerText = text
    output_msg.classList.add("returned_data")

    sql_output.appendChild(output_msg)
}

function fetchData(q_type, body) {
    fetch("/admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((res) => {
        return res.json()
    }).then((data) => {
        
        // SELECT query
        if (q_type == "SELECT") {
            data["msg"].forEach(element => {
                createOutput(element)
            });
        }
        else {
            console.log("Unknown query...")
        }

    }).catch(err => console.log(`Error => ${err}`))
}

function querySelect(query) {
    fetchData("SELECT", { "q_type": "SELECT", "query": query })
}

// App
const query_btn = document.getElementById("queryBtn")

query_btn.addEventListener("click", () => {
    const query_type_input = document.getElementById("queryTypeInput")
    const query_input = document.getElementById("queryInput")

    // Query SELECT
    if (query_type_input.value == "SELECT") {
        querySelect(query_input.value)
    }
    else {
        console.log("Unknown command. Check your MySQL syntax.")
    }
})