DROP SCHEMA IF EXISTS legostore CASCADE;

CREATE SCHEMA legostore;

-- USERS
CREATE TABLE legostore.users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

--CATEGORIES
CREATE TABLE legostore.categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- PRODUCTS
CREATE TABLE legostore.legos (
    lego_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES legostore.categories(category_id)
);

-- CART
CREATE TABLE legostore.carts (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES legostore.users(user_id)
);
-- Cart Items
CREATE TABLE legostore.cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT NOT NULL,
    lego_id INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES legostore.carts(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (lego_id) REFERENCES legostore.legos(lego_id)
);

CREATE TYPE order_status AS ENUM (
    'pending',
    'paid',
    'shipped',
    'completed',
    'canceled'
);
-- ORDERS
CREATE TABLE legostore.orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10,2) DEFAULT 0,
	status order_status DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES legostore.users(user_id)
);
-- Order Items
CREATE TABLE legostore.order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    lego_id INT NOT NULL,
    quantity INT NOT NULL,
    price_each DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES legostore.orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (lego_id) REFERENCES legostore.legos(lego_id)
);


-- REVIEWS
CREATE TABLE legostore.reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    lego_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES legostore.users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (lego_id) REFERENCES legostore.legos(lego_id) ON DELETE CASCADE
);