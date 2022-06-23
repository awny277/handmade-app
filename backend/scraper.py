from bs4 import BeautifulSoup
import os, requests, sqlite3

conn = sqlite3.connect("database.db")
c = conn.cursor()

# Escape any exception that may arise due to the table being already created (In case of re-running the script)
try:
    c.execute("""
        CREATE TABLE products (
            id INTEGER PRIMARY KEY,
            title TEXT,
            description TEXT,
            price REAL,
            category TEXT,
            img_path TEXT
        )
        """)
    c.commit()
except:
    pass

source = requests.get("https://handmade-egypt.com/store/").text

soup = BeautifulSoup(source, "lxml")

categories_list = soup.find("ul", id="menu-categories")

categories = categories_list.find_all("li")

categories_to_urls = {}

for category in categories:
    category_formatted = category.text.lower().replace(", ", "-").replace(" & ", "-")
    
    # Skip the 'clothes' category
    if category_formatted == "clothes":
        continue
    
    category_url = f"https://handmade-egypt.com/product-category/{category_formatted}/"
    categories_to_urls[category_formatted] = category_url

# Escape FileExistsError (In case of re-running the script, this exception may arise)
try:
    os.mkdir("static/images/")
except FileExistsError:
    pass

for category, category_url in categories_to_urls.items():
    category_source = requests.get(category_url).text
    category_soup = BeautifulSoup(category_source, "lxml")
    products = category_soup.find_all("div", class_="product")

    # Escape FileExistsError (In case of re-running the script, this exception may arise)
    try:
        os.mkdir(f"static/images/{category}")
    except FileExistsError:
        pass

    for product in products:
        title = product.h3.text

        if title == "Agréable Small Palm Tree Basket":
            product_source = requests.get(f"https://handmade-egypt.com/product/agreable-small-palm-tree-basket/").text
        elif title == "Beauteous Thin Round Rug":
            product_source = requests.get(f"https://handmade-egypt.com/product/beauteous-thin-round-rug-2/").text
        elif title == "Délicieux Palm Tree Waste Basket":
            product_source = requests.get(f"https://handmade-egypt.com/product/delicieux-palm-tree-waste-basket/").text
        elif title == "Hanging chair":
            product_source = requests.get(f"https://handmade-egypt.com/product/hang-chair/").text
        else:
            product_source = requests.get(f"https://handmade-egypt.com/product/{title.lower().replace(' ', '-')}/").text
        
        product_soup = BeautifulSoup(product_source, "lxml")
        description = product_soup.find("div", class_="woocommerce-Tabs-panel--description").text
        
        # Image file details
        img_url = product.find("a", class_="product-image-link").img["src"]
        img_title = title.replace(" ", "-")
        img_path = f"static/images/{category}/{img_title}{img_url[-4:]}"
        img_bytes = requests.get(img_url).content
        
        # Save new image file
        with open(img_path, "wb") as handler:
            handler.write(img_bytes)

        try:
            price = float(product.find("span", class_="price").bdi.text[3:].replace(',', ''))
        except:
            price = 0

        c.execute("INSERT INTO products(title, description, price, category, img_path)\
                    VALUES(:title, :description, :price, :category, :img_path)",
                {"title": title, "description": description, "price": price, "category": category, "img_path": img_path}
            )
        conn.commit()

conn.close()
