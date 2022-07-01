from calendar import c
import sqlite3
from flask import Flask, request, session
from flask_session import Session
from flask_cors import CORS, cross_origin
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
CORS(app)

# Convert return value of cursor.fetchall() to a dictionary
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

connection = sqlite3.connect("database.db", check_same_thread=False)
connection.row_factory = dict_factory
cursor = connection.cursor()

# cursor.execute("""CREATE TABLE special_orders (
#         id INTEGER PRIMARY KEY,
#         user_id INTEGER,
#         title TEXT UNIQUE NOT NULL,
#         description TEXT NOT NULL,
#         required_skills TEXT NOT NULL,
#         est_delivery_time TEXT NOT NULL,
#         expected_budget TEXT,
#         category TEXT,
#         sub_category TEXT,
#         img_url TEXT
#     )""")
# connection.commit()

# with connection:
#     cursor.execute("DROP TABLE users_info")
#     cursor.execute("DROP TABLE users")

try:
    cursor.execute("""CREATE TABLE users_info (
        user_id INTEGER,
        firstname TEXT,
        lastname TEXT,
        phone_number TEXT,
        city TEXT,
        state TEXT,
        address_1 TEXT,
        address_2 TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )""")
    connection.commit()
    
    cursor.execute("""CREATE TABLE users (
        id INTEGER PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        hash TEXT NOT NULL,
        type TEXT NOT NULL
    )""")
    connection.commit()

    cursor.execute("""CREATE TABLE carts (
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
    )""")
    connection.commit()

    cursor.execute("""CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )""")
    connection.commit()

    cursor.execute("""CREATE TABLE order_items (
        order_id INTEGER,
        product_id INTEGER,
        FOREIGN KEY(order_id) REFERENCES orders(id),
        FOREIGN KEY(product_id) REFERENCES products(id)
    )""")
    connection.commit()
except:
    pass


def get_products():
    """
    Query the list of products and convert it to a dictionary
    where the keys are each product's id and its value is the product

    Returns:
        dict - A dictionary with all the products that consists of "product_id: product" pairs
    """
    cursor.execute("SELECT * FROM products")
    rows = cursor.fetchall()
    rows_dict = {}
    for index, row in enumerate(rows):
        rows_dict[index + 1] = row
    return rows_dict

def get_product(product_id):
    product = cursor.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    return product

@app.route("/")
@cross_origin(supports_credentials=True)
def index():
    return "Hello, World!"

@app.route("/products")
@cross_origin(supports_credentials=True)
def products():
    """Send products list to client"""
    products_ = get_products()
    return products_

@app.route("/product/<int:product_id>")
@cross_origin(supports_credentials=True)
def product(product_id):
    """Send a single product details to client"""
    product_ = get_product(product_id)
    return product_

@app.post("/add_product")
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
def add_cart():
    request_data = request.get_json()
    
    product_id = None

    if request_data:
        if "product_id" in request_data:
            product_id = request_data["product_id"]
    
    if not product_id:
        return "Failed to add item to cart."

    with connection:
        cursor.execute("INSERT INTO carts VALUES(?, ?)", (session["user_id"], product_id))

    return "Added to cart!"

@app.route("/get_cart")
@cross_origin(supports_credentials=True)
def get_cart():
    products = cursor.execute("""SELECT * FROM products WHERE id IN
                                 (SELECT product_id FROM carts WHERE user_id = ?)""", (session["user_id"],)).fetchall()
    return str(products)

@app.post("/order")
@cross_origin(supports_credentials=True)
def order():
    with connection:
        cursor.execute("INSERT INTO orders(user_id) VALUES(?)", (session["user_id"],))

    order_id = cursor.execute("SELECT id FROM orders WHERE user_id = ?", (session["user_id"],)).fetchall()[-1]["id"]
    
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
@cross_origin(supports_credentials=True)
def register():
    """Register user"""

    request_data = request.get_json()

    # Extract the username, password and its confirmation
    username = request_data["username"]
    email = request_data["email"]
    password = request_data["password"]
    type = request_data["type"]

    # Ensure username was submitted
    if not username:
        return "Please choose a username"

    # Ensure username does not already exist
    elif len(cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchall()) == 1:
        return "Username already taken. Please choose a different username."

    # Ensure password was submitted
    elif not password:
        return "Please enter a password."
    
    elif not type:
        return "Please choose an account type."

    else:
        # Insert the new user into the database
        with connection:
            cursor.execute("INSERT INTO users(username, email, hash, type) values(?, ?, ?, ?)", (username, email, generate_password_hash(password), type))

        # Log the user in and remember him
        session["user_id"] = cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()["id"]

        return "Registration successful!"

@app.route("/session")
@cross_origin(supports_credentials=True)
def current():
    print(session.keys(), session.values) # Empty !

@app.post("/login")
@cross_origin(supports_credentials=True)
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()
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

    else:
        # Remember which user has logged in
        session["user_id"] = user["id"]
        
        session_contents = []
        for key, value in session.items():
            session_contents.append((key, value))

        return {"session": session_contents, "message": "You logged in successfully!", "id": user["id"], "username": user["username"], "email": email}

@app.route("/logout")
@cross_origin(supports_credentials=True)
def logout():
    session.clear()
    
    session_contents = []
    for key, value in session.items():
        session_contents.append((key, value))
    
    return {"session": session_contents, "message": "Logged out."}

@app.route("/user")
@cross_origin(supports_credentials=True)
def get_user():
    cursor.execute("SELECT * FROM users_info WHERE user_id = ?", (session["user_id"],))
    return cursor.fetchone()

@app.route("/users")
@cross_origin(supports_credentials=True)
def users():
    users = cursor.execute("SELECT * FROM users").fetchall()
    return str(users)

@app.route("/schema")
@cross_origin(supports_credentials=True)
def schema():
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    return str(cursor.fetchall())

@app.post("/set_profile")
@cross_origin(supports_credentials=True)
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
        cursor.execute("DELETE FROM users_info WHERE user_id = ?", (session["user_id"],))
        
        if state and address_2:
            cursor.execute("""INSERT INTO users_info(user_id, firstname, lastname, phone_number, city, state, address_1, address_2)
                            VALUES(:user_id, :firstname, :lastname, :phone_number, :city, :state, :address_1, :address_2)""",
                            {"user_id": session["user_id"], "firstname": firstname, "lastname": lastname, "phone_number": phone_number,
                            "city": city, "state": state, "address_1": address_1, "address_2": address_2})
        elif state and not address_2:
            cursor.execute("""INSERT INTO users(user_id, firstname, lastname, phone_number, city, state, address_1)
                            VALUES(:user_id, :firstname, :lastname, :phone_number, :city, :state, :address_1)""",
                            {"user_id": session["user_id"], "firstname": firstname, "lastname": lastname, "phone_number": phone_number,
                            "city": city, "state": state, "address_1": address_1})
        elif not state and address_2:
            cursor.execute("""INSERT INTO users(user_id, firstname, lastname, phone_number, city, address_1, address_2)
                            VALUES(:user_id, :firstname, :lastname, :phone_number, :city, :address_1, :address_2)""",
                            {"user_id": session["user_id"], "firstname": firstname, "lastname": lastname, "phone_number": phone_number,
                            "city": city, "address_1": address_1, "address_2": address_2})
        else:
            cursor.execute("""INSERT INTO users(user_id, firstname, lastname, phone_number, city, address_1)
                            VALUES(:user_id, :firstname, :lastname, :phone_number, :city, :address_1)""",
                            {"user_id": session["user_id"], "firstname": firstname, "lastname": lastname, "phone_number": phone_number,
                            "city": city, "address_1": address_1})
    
    response = []
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    return response

@app.route("/profile")
@cross_origin(supports_credentials=True)
def profile():
    """Send user info back to the client"""

    user_info = cursor.execute("""SELECT firstname, lastname, phone_number, city, state, address_1, address_2
                    FROM users WHERE id = ?""", (session["user_id"],)).fetchone()
    return user_info

@app.post("/add_special_order")
@cross_origin(supports_credentials=True)
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

    if not title or not description or not required_skills or not expected_budget\
         or not est_delivery_time or not category or not sub_category or not img_url:
        return "Failed."

    with connection:
        cursor.execute("""INSERT INTO special_orders(user_id, title, description, required_skills, est_delivery_time, expected_budget, category, sub_category, img_url)
                        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (session["user_id"], title, description, required_skills, est_delivery_time, expected_budget, category, sub_category, img_url))
    
    return "Special order added."

@app.route("/special_orders")
@cross_origin(supports_credentials=True)
def special_orders():
    special_orders_ = cursor.execute("SELECT * FROM special_orders WHERE user_id = ?", (session["user_id"],)).fetchall()
    return special_orders_
