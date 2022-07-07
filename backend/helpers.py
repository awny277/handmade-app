import sqlite3

# Convert return value of cursor.fetchall() to a dictionary
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

connection = sqlite3.connect("database.db", check_same_thread=False)
connection.row_factory = dict_factory
cursor = connection.cursor()

# cursor.execute("""CREATE TABLE users (
#     id INTEGER PRIMARY KEY,
#     username TEXT UNIQUE NOT NULL,
#     email TEXT NOT NULL,
#     hash TEXT NOT NULL,
#     type TEXT NOT NULL
# )""")
# connection.commit()

# cursor.execute("""CREATE TABLE users_details (
#     user_id INTEGER,
#     firstname TEXT,
#     lastname TEXT,
#     phone_number TEXT,
#     city TEXT,
#     state TEXT,
#     address_1 TEXT,
#     address_2 TEXT,
#     FOREIGN KEY(user_id) REFERENCES users(id)
# )""")
# connection.commit()

# cursor.execute("""CREATE TABLE carts (
#     user_id INTEGER NOT NULL,
#     product_id INTEGER NOT NULL,
#     FOREIGN KEY(user_id) REFERENCES users(id),
#     FOREIGN KEY(product_id) REFERENCES products(id)
# )""")
# connection.commit()

# cursor.execute("""CREATE TABLE orders (
#     id INTEGER PRIMARY KEY,
#     user_id INTEGER,
#     FOREIGN KEY(user_id) REFERENCES users(id)
# )""")
# connection.commit()

# cursor.execute("""CREATE TABLE order_items (
#     order_id INTEGER,
#     product_id INTEGER,
#     FOREIGN KEY(order_id) REFERENCES orders(id),
#     FOREIGN KEY(product_id) REFERENCES products(id)
# )""")
# connection.commit()

# cursor.execute("""CREATE TABLE special_orders (
#         id INTEGER PRIMARY KEY,
#         user_id INTEGER,
#         title TEXT NOT NULL,
#         description TEXT NOT NULL,
#         required_skills TEXT NOT NULL,
#         est_delivery_time TEXT NOT NULL,
#         expected_budget TEXT,
#         category TEXT,
#         sub_category TEXT,
#         img_url TEXT
#     )""")
# connection.commit()


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
