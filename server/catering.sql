DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR NOT NULL CHECK (first <> ''),
    last VARCHAR NOT NULL CHECK (last <> ''),
    phone VARCHAR NOT NULL CHECK (phone <> ''),
    email VARCHAR NOT NULL CHECK (email <> ''),
    hashpass VARCHAR,
    address TEXT,
    admin BOOLEAN DEFAULT false,
    registered BOOLEAN DEFAULT false,
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
    type VARCHAR NOT NULL CHECK (name <> ''),
    imgurl TEXT,
    price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    totalprice INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orderitems (
    id SERIAL PRIMARY KEY,
    food_id INT REFERENCES food(id),
    amount INT NOT NULL,
    order_id INT REFERENCES orders(id)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    msg TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

