import sqlite3
from flask import Flask, request, session
from flask_session import Session
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Convert return value of cursor.fetchall() to a dictionary
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

connection = sqlite3.connect("database.db", check_same_thread=False)
connection.row_factory = dict_factory
cursor = connection.cursor()

# conn = sqlite3.connect("database.db", check_same_thread=False)
# conn.row_factory = dict_factory
# cur = conn.cursor()

# cursor.execute("DROP TABLE users")

# try:
#     cursor.execute("""CREATE TABLE users (
#         id INTEGER PRIMARY KEY,
#         username TEXT UNIQUE NOT NULL,
#         email TEXT NOT NULL,
#         hash TEXT NOT NULL,
#         type TEXT NOT NULL
#     )""")
#     connection.commit()

#     # cursor.execute("""CREATE TABLE products (
#     #     id INTEGER PRIMARY KEY,
#     #     title TEXT,
#     #     description TEXT,
#     #     price REAL,
#     #     category TEXT,
#     #     img_path TEXT
#     # )""")
#     # connection.commit()

#     cursor.execute("""CREATE TABLE carts (
#         user_id INTEGER NOT NULL,
#         product_id INTEGER NOT NULL,
#         FOREIGN KEY(user_id) REFERENCES users(id),
#         FOREIGN KEY(product_id) REFERENCES products(id)
#     )""")
#     connection.commit()

#     cursor.execute("""CREATE TABLE orders (
#         id INTEGER PRIMARY KEY,
#         user_id INTEGER,
#         FOREIGN KEY(user_id) REFERENCES users(id)
#     )""")
#     connection.commit()

#     cursor.execute("""CREATE TABLE order_items (
#         order_id INTEGER,
#         product_id INTEGER,
#         FOREIGN KEY(order_id) REFERENCES orders(id),
#         FOREIGN KEY(product_id) REFERENCES products(id)
#     )""")
#     connection.commit()
# except:
#     pass


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

    cursor.execute("INSERT INTO products(title, description, price, category, img_path) VALUES(?, ?, ?, ?, ?)",
                    (title, description, price, category, img_path))
    connection.commit()
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

    cursor.execute("INSERT INTO carts VALUES(?, ?)", (session["user_id"], product_id))
    connection.commit()
    return "Added to cart!"

@app.route("/get_cart")
def get_cart():
    products = cursor.execute("""SELECT * FROM products WHERE id IN
                                 (SELECT product_id FROM carts WHERE user_id = ?)""", (session["user_id"],)).fetchall()
    return str(products)

@app.post("/order")
def order():
    cursor.execute("INSERT INTO orders(user_id) VALUES(?)", (session["user_id"],))
    connection.commit()
    order_id = cursor.execute("SELECT id FROM orders WHERE user_id = ?", (session["user_id"],)).fetchall()[-1]["id"]
    
    request_data = request.get_json()

    products_ids = None

    if request_data:
        if "products_ids" in request_data:
            products_ids = request_data["products_ids"]
    
    if not products:
        return "Failed to place order"
    
    for product_id in products_ids:
        cursor.execute("INSERT INTO order_items VALUES(?, ?)", (order_id, product_id))
        connection.commit()
    
    return "Order placed!"


@app.post("/register")
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
        cursor.execute("INSERT INTO users(username, email, hash, type) values(?, ?, ?, ?)", (username, email, generate_password_hash(password), type))
        connection.commit()

        # Log the user in and remember him
        session["user_id"] = cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()["id"]

        return "Registration successful!"

@app.post("/login")
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()
    request_data = request.get_json()

    # User reached route via POST (as by submitting a form via POST)
    username = None
    password = None

    if request_data:
        if "username" in request_data:
            username = request_data["username"]
        if "password" in request_data:
            password = request_data["password"]

    # Ensure username was submitted
    if not username:
        return "Username must be provided"

    # Ensure password was submitted
    elif not password:
        return "Password must be provided"

    # Query database for username
    user = cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()

    # Ensure username exists and password is correct
    if not user or not check_password_hash(user["hash"], password):
        return "Invalid username and/or password"

    else:
        # Remember which user has logged in
        session["user_id"] = user["id"]

        return "You logged in successfully!"

@app.route("/logout")
def logout():
    session.clear()
    return "Logged out."

@app.route("/users")
def users():
    users = cursor.execute("SELECT * FROM users").fetchall()
    return str(users)

@app.route("/schema")
def schema():
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    return str(cursor.fetchall())
