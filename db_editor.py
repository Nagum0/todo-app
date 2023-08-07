import mysql.connector

class DBConn:
    def __init__(self, host: str, user: str, password: str, db_name: str) -> None:
        # -- Variables and DB connections
        self.host = host
        self.user = user
        self.password = password
        self.db_name = db_name

        # Empty MySQL connector.
        self.DATABASE = mysql.connector.connect()

    # -- Create connection
    def create_conn(self) -> None:
        try:
            self.DATABASE = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.db_name
            )

            print("Connected to the database.")
        except Exception as e:
            print(f"Error while connecting to database: {e}")

    # -- Close connection
    def dc(self) -> None:
        self.DATABASE.close()
        print("Database connection closed.")

    # -- Checks if login credentials are correct.
    def check_login(self, username: str, password: str) -> bool:
        cursor = self.DATABASE.cursor()

        try:
            cursor.execute("SELECT userName, password FROM Users WHERE userName = %s", (username, ))
            data = cursor.fetchall()

            if data[0][0] == username and data[0][1] == password:
                print("Logged in...")
                cursor.close()
                return True
            else:
                cursor.close()
                return False
        except Exception as e:
            cursor.close()
            print(f"User not found: {e}.")

    # Takes a data dictionary as a parameter and saves it to the mysql database.
    def register(self, register_data: dict) -> bool:
        cursor = self.DATABASE.cursor()

        try:
            cursor.execute("INSERT INTO Users VALUES (%s, %s, %s)", (register_data["username"], register_data["password"], register_data["email"], ))
            self.DATABASE.commit()
            cursor.close()
            print("User created...")
            return True
        except Exception as e:
            print("Error while registering: " + e)
            cursor.close()
            return False

    # -- Create table by the user's name.
    def create_user_table(self, username: str) -> None:
        cursor = self.DATABASE.cursor()

        try:
            query = f"CREATE TABLE `{username}` (title VARCHAR(100), body VARCHAR(255), completed VARCHAR(5));"
            cursor.execute(query)
            cursor.close()
            print("User table created...")
        except Exception as e:
            print(f"Error while creating user table: {e}")

    # -- Get table data.
    def get_table_data(self, user: str) -> list:
        cursor = self.DATABASE.cursor()

        try:
            cursor.execute(f"SELECT * FROM {user}")
            table_data = cursor.fetchall()
            cursor.close()
            
            return table_data
        except Exception as e:
            print("Error while reading user table data: " + e)

    # -- Returns a dictionary which holds the data of the user.
    def get_user_info(self, user: str) -> dict:
        cursor = self.DATABASE.cursor()
        cursor.execute("SELECT * FROM Users WHERE userName = %s", (user, ))
        data = cursor.fetchall()
        print(data)
        cursor.close()

        data_dict = {
            "user": data[0][0],
            "password": "********",
            "email": data[0][2]
        }

        return data_dict
    
    # -- Delete todo card from mysql database.
    def delete_todo_card(self, user: str, card_title: str) -> None:
        cursor = self.DATABASE.cursor()

        try:
            query = f"DELETE FROM {user} WHERE title = %s"
            cursor.execute(query, (card_title, ))
            self.DATABASE.commit()
            cursor.close()
            print("Card deleted...")
        except Exception as e:
            print(e)

    
if __name__ == "__main__":
    DATABASE_CONN = DBConn("bhwkpirbrqy17bkaclxz-mysql.services.clever-cloud.com", "ujfecpzghum2bsdt", "qGxkGCeUQbz1YNgzg80K", "bhwkpirbrqy17bkaclxz")
    DATABASE_CONN.get_table_data("zeki")