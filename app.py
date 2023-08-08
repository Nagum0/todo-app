from flask import Flask, render_template, url_for, request, json, jsonify, redirect, session
from db_editor import DBConn

# -- MYSQL CONNECTION
DATABASE_CONN = DBConn("bhwkpirbrqy17bkaclxz-mysql.services.clever-cloud.com", "ujfecpzghum2bsdt", "qGxkGCeUQbz1YNgzg80K", "bhwkpirbrqy17bkaclxz")

# -- App setup
app = Flask(__name__)
app.secret_key = "0000"

# --------------------------- #
#            INDEX            #
# --------------------------- #
@app.route("/")
def index():
    return render_template("index.html")

# --------------------------- #
#            LOGIN            #
# --------------------------- #
@app.route("/login", methods=["POST", "GET"])
def login():
    if "user" in session:
        return redirect(url_for("home"))
    else:
        if request.method == "POST":
            # Connect to mysql database.
            DATABASE_CONN.create_conn()

            # Get data from frontend.
            data = request.get_json()

            # Check login
            if DATABASE_CONN.check_login(data["user"], data["password"]):
                session["user"] = data["user"]
                session["card_data"] = DATABASE_CONN.get_table_data(data["user"])

                return redirect(url_for("home"))
            else:
                error_msg = { "msg": "Incorrect username and password combination." }
                return jsonify(error_msg)
        else:
            return render_template("login.html")

# --------------------------- #
#           SIGN UP           #
# --------------------------- #
@app.route("/signup", methods=["POST", "GET"])
def signup():
    if "user" in session:
        return redirect(url_for("home"))
    else:
        if request.method == "POST":
            # Connect to mysql database.
            DATABASE_CONN.create_conn()

            # Get data from frontend.
            data = request.get_json()

            if DATABASE_CONN.register(data):
                DATABASE_CONN.create_user_table(data["username"])
                return redirect(url_for("login"))
            else:
                return jsonify({ "msg": "Error while signing up. Please try later." })
        else:
            return render_template("sign_up.html")

# --------------------------- #
#           LOGOUT            #
# --------------------------- #
@app.route("/logout")
def logout():
    session.clear()
    # Close mysql database connection.
    DATABASE_CONN.dc()

    return redirect(url_for("index"))

# --------------------------- #
#            HOME             #
# --------------------------- #
@app.route("/home", methods=["POST", "GET"])
def home():
    if "user" in session:
        DATABASE_CONN.create_conn()
        session["card_data"] = DATABASE_CONN.get_table_data(session["user"])

        if request.method == "POST":
            data = request.get_json()

            # Delete functionality
            if data["cmd"] == "delete":
                DATABASE_CONN.delete_todo_card(session["user"], data["card_title"])
                session["card_data"] = DATABASE_CONN.get_table_data(session["user"])
                return jsonify({ "msg": "deleted" })
            # Confirm functionality
            elif data["cmd"] == "confirm":
                DATABASE_CONN.confirm_todo_card(session["user"], data["card_title"])
                session["card_data"] = DATABASE_CONN.get_table_data(session["user"])
                return jsonify({ "msg": "Confirmed" })
            else:
                return jsonify({ "msg": "error while requesting" })
        else:
            return render_template("home.html", session=session, card_list=session["card_data"])
    else:
        return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)