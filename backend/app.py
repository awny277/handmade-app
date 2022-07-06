from helpers import *
from flask import Flask, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app, supports_credentials=True)

# app.config['SECRET_KEY'] = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_TYPE"] = "filesystem"
# Session(app)

user_id = 0

@app.route("/")
def index():
    return "Hello, World!"

@app.route("/products")
def products():
    """Send products list to client"""
    products_ = get_products()
    return products_


@app.route("/product/<int:product_id>")
def product(product_id):
    """Send a single product details to client"""
    product_ = get_product(product_id)
    return product_


@app.post("/add_product")
def add_product():
    request_data = request.get_json()

    title = None
    description = None
    price = None
    category = None
    img_path = None

    if request_data:
        if "title" in request_data:
            title = request_data["title"]
        if "description" in request_data:
            description = request_data["description"]
        if "price" in request_data:
            price = request_data["price"]
        if "category" in request_data:
            category = request_data["category"]
        if "img_path" in request_data:
            img_path = request_data["img_path"]

    if not title or not description or not price or not category or not img_path:
        return "Failed."

    with connection:
        cursor.execute("INSERT INTO products(title, description, price, category, img_path) VALUES(?, ?, ?, ?, ?)",
                       (title, description, price, category, img_path))

    return "Product added."


@app.post("/add_cart")
def add_cart():
    request_data = request.get_json()

    product_id = None

    if request_data:
        if "product_id" in request_data:
            product_id = request_data["product_id"]

    if not product_id:
        return "Failed to add item to cart."

    with connection:
        cursor.execute("INSERT INTO carts VALUES(?, ?)", (user_id, product_id))

    return "Added to cart!"


@app.route("/get_cart")
def get_cart():
    products_ = cursor.execute("""SELECT * FROM products WHERE id IN
                                 (SELECT product_id FROM carts WHERE user_id = ?)""", (user_id,)).fetchall()
    return str(products_)


@app.post("/order")
def order():
    with connection:
        cursor.execute("INSERT INTO orders(user_id) VALUES(?)", (user_id,))

    order_id = cursor.execute("SELECT id FROM orders WHERE user_id = ?", (user_id,)).fetchall()[-1]["id"]

    request_data = request.get_json()

    products_ids = None

    if request_data:
        if "products_ids" in request_data:
            products_ids = request_data["products_ids"]

    if not products:
        return "Failed to place order"

    for product_id in products_ids:
        with connection:
            cursor.execute("INSERT INTO order_items VALUES(?, ?)", (order_id, product_id))

    return "Order placed!"


@app.post("/register")
def register():
    """Register user"""

    request_data = request.get_json()

    # Extract the username, password and its confirmation
    username = request_data["username"]
    email = request_data["email"]
    password = request_data["password"]
    type_ = request_data["type"]

    # Ensure username was submitted
    if not username:
        return "Please choose a username"

    # Ensure username does not already exist
    elif len(cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchall()) == 1:
        return "Username already taken. Please choose a different username."

    # Ensure password was submitted
    elif not password:
        return "Please enter a password."

    elif not type_:
        return "Please choose an account type."

    else:
        # Insert the new user into the database
        with connection:
            cursor.execute("INSERT INTO users(username, email, hash, type) values(?, ?, ?, ?)",
                           (username, email, generate_password_hash(password), type_))
        
        global user_id
        user_id = cursor.execute("SELECT id FROM users WHERE username = ?", (username,)).fetchone()["id"]

        return "Registration successful!"


@app.post("/login")
def login():
    """Log user in"""

    # Forget any user_id
    global user_id
    user_id = 0
    request_data = request.get_json()

    # User reached route via POST (as by submitting a form via POST)
    email = None
    password = None

    if request_data:
        if "email" in request_data:
            email = request_data["email"]
        if "password" in request_data:
            password = request_data["password"]

    # Ensure username was submitted
    if not email:
        return "Email must be provided"

    # Ensure password was submitted
    elif not password:
        return "Password must be provided"

    # Query database for username
    user = cursor.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()

    # Ensure username exists and password is correct
    if not user or not check_password_hash(user["hash"], password):
        return "Invalid email and/or password"

    user_id = user["id"]

    return {"message": "You logged in successfully!", "id": user["id"],
            "username": user["username"], "email": email, "type": user["type"]}


@app.route("/logout")
def logout():
    global user_id
    user_id = 0
    return "Logged out"


@app.route("/user")
def user():
    user_ = cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
    return str(user_)


@app.route("/user_info")
def user_info():
    user_info_ = cursor.execute("SELECT * FROM users_info WHERE user_id = ?", (user_id,)).fetchone()
    return str(user_info_)


@app.route("/users")
def users():
    users_ = cursor.execute("SELECT * FROM users").fetchall()
    return str(users_)


@app.route("/schema")
def schema():
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    return str(cursor.fetchall())


@app.post("/set_profile")
def set_profile():
    """Set or update user info"""

    request_data = request.get_json()

    firstname = None
    lastname = None
    phone_number = None
    city = None
    state = None
    address_1 = None
    address_2 = None

    if request_data:
        if "firstname" in request_data:
            firstname = request_data["firstname"]
        if "lastname" in request_data:
            lastname = request_data["lastname"]
        if "phone_number" in request_data:
            phone_number = request_data["phone_number"]
        if "city" in request_data:
            city = request_data["city"]
        if "state" in request_data:
            state = request_data["state"]
        if "address_1" in request_data:
            address_1 = request_data["address_1"]
        if "address_2" in request_data:
            address_2 = request_data["address_2"]

    with connection:
        cursor.execute("DELETE FROM users_info WHERE user_id = ?", (user_id,))

        if state and address_2:
            cursor.execute("""INSERT INTO users_info(user_id, firstname, lastname, phone_number, city, state, 
            address_1, address_2) VALUES(:user_id, :firstname, :lastname, :phone_number, :city, :state, :address_1, 
            :address_2)""",
                           {"user_id": user_id, "firstname": firstname, "lastname": lastname,
                            "phone_number": phone_number,
                            "city": city, "state": state, "address_1": address_1, "address_2": address_2})
        elif state and not address_2:
            cursor.execute("""INSERT INTO users(user_id, firstname, lastname, phone_number, city, state, address_1)
                            VALUES(:user_id, :firstname, :lastname, :phone_number, :city, :state, :address_1)""",
                           {"user_id": user_id, "firstname": firstname, "lastname": lastname,
                            "phone_number": phone_number,
                            "city": city, "state": state, "address_1": address_1})
        elif not state and address_2:
            cursor.execute("""INSERT INTO users(user_id, firstname, lastname, phone_number, city, address_1, address_2)
                            VALUES(:user_id, :firstname, :lastname, :phone_number, :city, :address_1, :address_2)""",
                           {"user_id": user_id, "firstname": firstname, "lastname": lastname,
                            "phone_number": phone_number,
                            "city": city, "address_1": address_1, "address_2": address_2})
        else:
            cursor.execute("""INSERT INTO users(user_id, firstname, lastname, phone_number, city, address_1)
                            VALUES(:user_id, :firstname, :lastname, :phone_number, :city, :address_1)""",
                           {"user_id": user_id, "firstname": firstname, "lastname": lastname,
                            "phone_number": phone_number,
                            "city": city, "address_1": address_1})

    return "Profile updated."


@app.route("/profile")
def profile():
    """Send user info back to the client"""

    user_info = cursor.execute("""SELECT firstname, lastname, phone_number, city, state, address_1, address_2
                    FROM users WHERE id = ?""", (user_id,)).fetchone()
    return user_info


@app.post("/add_special_order")
def add_special_order():
    request_data = request.get_json()

    title = None
    description = None
    required_skills = None
    est_delivery_time = None
    expected_budget = None
    category = None
    sub_category = None
    img_url = None

    if request_data:
        if "title" in request_data:
            title = request_data["title"]
        if "description" in request_data:
            description = request_data["description"]
        if "required_skills" in request_data:
            required_skills = request_data["required_skills"]
        if "est_delivery_time" in request_data:
            est_delivery_time = request_data["est_delivery_time"]
        if "expected_budget" in request_data:
            expected_budget = request_data["expected_budget"]
        if "category" in request_data:
            category = request_data["category"]
        if "sub_category" in request_data:
            sub_category = request_data["sub_category"]
        if "img_url" in request_data:
            img_url = request_data["img_url"]

    with connection:
        cursor.execute("""INSERT INTO special_orders(user_id, title, description, required_skills, est_delivery_time, 
        expected_budget, category, sub_category, img_url) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)""", 
                       (user_id, title, description, required_skills, est_delivery_time, expected_budget,
                        category, sub_category, img_url))

    return "Special order added."


@app.route("/special_orders")
def special_orders():
    special_orders_ = cursor.execute("SELECT * FROM special_orders WHERE user_id = ?", (user_id,)).fetchall()
    return special_orders_


if __name__ == "__main__":
    app.run(debug=True)
