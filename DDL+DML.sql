DROP SCHEMA IF EXISTS legostore CASCADE;

-- ALTER TYPE order_status ADD VALUE 'processing';

CREATE SCHEMA legostore;

-- CREATE TYPE role_type AS ENUM (
--     'user',
--     'admin'
-- );

-- USERS
CREATE TABLE legostore.users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
	role role_type DEFAULT 'user'
);

--CATEGORIES
CREATE TABLE legostore.categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- Legos
CREATE TABLE legostore.legos (
    lego_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_key VARCHAR(255),
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
    FOREIGN KEY (lego_id) REFERENCES legostore.legos(lego_id) ON DELETE CASCADE

);

-- CREATE TYPE order_status AS ENUM (
--     'pending',
--     'paid',
--     'shipped',
--     'completed',
--     'canceled'
-- );
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
    quantity INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES legostore.orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (lego_id) REFERENCES legostore.legos(lego_id) ON DELETE CASCADE
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


--Enter USERS

INSERT INTO legostore.users (username, email, password)
VALUES ('theBuilder', 'builder@gmail.com', '$2a$12$Kn0DsLodlZf1oy2PY.BUgucWCz/tFU5EWKJF2cCou9GTFJslSNSNK'); 
--password: LegoIsFun123

INSERT INTO legostore.users (username, email, password, role)
VALUES ('adimin', 'admin@gmail.com', '$2a$12$UezEjKIYWilrHdoDGoLaau9FMvHE8laqaNBzQU6gcgtD7Mb./Bpkq', 'admin');
--password: 123456

INSERT INTO legostore.users (username, email, password)
VALUES ('ninja', 'ninjago@gmail.com', '$2a$12$k0.7Sp5ab/cjdyrn6DzqNOEM2g.87PDaxfJaO9DMXLfks/pHGiecm');
--password: 654321

--Enter Legos

INSERT INTO legostore.legos (name, description, price)
VALUES ('owl', 'smart owl', 15);



--Enter 


