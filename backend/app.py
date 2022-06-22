import sqlite3
from urllib import response
from flask import Flask, render_template, redirect, request, url_for, session
#from flask_session import Session
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

app = Flask(__name__)
CORS(app)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
#Session(app)

# Convert return value of cursor.fetchall() to a dictionary
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

connection = sqlite3.connect(":memory:", check_same_thread=False)
connection.row_factory = dict_factory
cursor = connection.cursor()

conn = sqlite3.connect("database.db", check_same_thread=False)
conn.row_factory = dict_factory
cur = conn.cursor()

cursor.execute("""CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    hash TEXT NOT NULL
)""")
connection.commit()

def get_products():
    """
    Query the list of products and convert it to a dictionary
    where the keys are each product's id and its value is the product

    Returns:
        dict - A dictionary with all the products that consists of "product_id: product" pairs
    """
    cur.execute("SELECT * FROM products")
    rows = cur.fetchall()
    rows_dict = {}
    for index, row in enumerate(rows):
        rows_dict[index + 1] = row
    return rows_dict

def get_product(product_id):
    cur.execute("SELECT * FROM products WHERE id = ?", (product_id,))
    return cur.fetchone()

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

@app.post("/register")
def register():
    """Register user"""

    request_data = request.get_json()

    # Extract the username, password and its confirmation
    username = request_data["username"]
    email = request_data["email"]
    password = request_data["password"]

    # Ensure username was submitted
    if not username:
        return "Please choose a username"

    # Ensure username does not already exist
    elif len(cursor.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchall()) == 1:
        return "Username already taken. Please choose a different username."

    # Ensure password was submitted
    elif not password:
        return "Please enter a password."

    else:
        # Insert the new user into the database
        cursor.execute("INSERT INTO users(username, email, hash) values(?, ?, ?)", (username, email, generate_password_hash(password)))

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
