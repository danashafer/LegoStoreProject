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

INSERT INTO legostore.legos (name, description, price, image_key)
VALUES 
('Cat', 'cute', 2378, 'legos/b5f0322f-3397-4a95-83a4-b280b259c131/1765128416106-catLego.jpg')
('Flowers', 'pretty', 678, 'legos/91995bbf-4c22-4794-846a-2ade970fb79c/1765128568586-flowersLego.jpg')
('Bloom Fox', 'small fox with flower tail and bright ear accents', 16, 'legos/f35f5724-0fa2-41ab-b50f-b00256df2464/1765129223322-foxLego.jpg'),
('Mini Turtle Pond', 'tiny turtle with a round shell beside a leaf pond piece', 14, 'legos/d7ac0dfb-0895-442d-8959-dbf006fa08cc/1765128771531-turtleLego.jpg'),
('Petal Bunny', 'white bunny with pastel flower crown and carrot tile', 15,'legos/f2fcea07-e24e-4f3c-8360-60881792c5ac/1765129237560-bunnyLego.jpg'),
('Sunflower Duo', 'two sunflower builds with round faces and green stems', 12, 'legos/e66be97a-3656-4f96-ac2a-8217146b1d1b/1765129204979-sunflowerLego.jpg'),
('Puffy Cloud Sheep', 'sheep with rounded white bricks and a soft face tile', 13,'legos/1c73bd26-0067-44a8-958e-01ce42b2dd65/1765128549952-sheepLego.jpg'),
--('Berry Hedgehog', 'hedgehog with small berry shaped spikes and leaf base', 16, ),
('Tiny Dolphin Wave', 'dolphin on a curved wave piece with splash detail', 14, 'legos/50097062-9f2c-417f-bee4-dfddcea47b45/1765129183522-dolphinLego.jpg'),
--('Baby Owl Perch', 'round eyed owl sitting on a branch with a small blossom', 15),
--('Pastel Garden Set', 'three small flowers with curved petals and tiny pot pieces', 11),
('Mini Panda Snack', 'panda holding a bamboo piece with a small ground tile', 15, 'legos/b6e4a049-ea49-47de-be7a-d5944512e940/1765129152177-pandaLego.jpg'),
('Blossom Bird', 'colorful bird with wing tiles and a short branch stand', 13 , 'legos/7cf70779-73df-4871-a5ee-b03c20c8ced9/1765129167808-birdLego.jpg'),
('Pocket Cactus Trio', 'three small cactus builds with different shapes and tiny pots', 10, 'legos/2a5957d8-04f2-441a-b01d-1a8cc59b0285/1765129257754-cactusLego.jpg'),
--('Cotton Tail Deer', 'small deer with soft edges and a mushroom tile base', 17),
--('Koi Pond Tile', 'koi fish build with ripples on a blue rounded plate', 12),
('Baby Penguin Slide', 'penguin figure on an ice slope with a snow tile', 14);



--Enter 


