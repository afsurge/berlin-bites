DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS orderitems;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS resetcodes;
DROP TABLE IF EXISTS food;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK (first <> ''),
    last VARCHAR NOT NULL CHECK (last <> ''),
    phone VARCHAR NOT NULL CHECK (phone <> ''),
    email VARCHAR NOT NULL UNIQUE CHECK (email <> ''),
    hashpass VARCHAR NOT NULL CHECK (hashpass <> ''),
    ppicurl TEXT,
    address TEXT,
    admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resetcodes (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR NOT NULL REFERENCES users(email),
    dcode VARCHAR NOT NULL CHECK (dcode <> ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE food (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL CHECK (name <> ''),
    type VARCHAR NOT NULL CHECK (type <> ''),
    description TEXT,
    imgurl TEXT,
    price NUMERIC(6,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    totalprice NUMERIC(6,2) NOT NULL,
    paytype VARCHAR NOT NULL DEFAULT 'Cash on Delivery',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orderitems (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    food_id INT REFERENCES food(id),
    amount INT NOT NULL DEFAULT 1
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    msg TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

